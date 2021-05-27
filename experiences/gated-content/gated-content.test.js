const { bootstprapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./gated-content.json');


const gatedContentTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		technology: 'web',
		experienceUrl: '/experiences/gated-content/gated-content.json'
	});

	it('setup', async function() {
		config = experience;
		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example'
		};

		await bootstrapExperience(browser, config, fixture);
	});

	it('card should render on scroll', async function() {
		const pixels = config.cards.gated.triggers.myScrollTrigger.spec.pixel;

		await scrollTo(browser, pixels);

		const cardExists = await isCardExisting(
			browser,
			config.cards.gated.cardSelector,
			async()=>{
				await scrollBy(browser, 50);
			}
		);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async() => {
		await scrollTo(browser, 600);

		const firstCard = await browser.$(config.cards.gated.cardSelector);

		expect(cardExists).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.paywall.cardSelector,
			config.cards.paywall.snapPoints.initial
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card should get promoted at certain element', async() => {
		await scrollToElement(browser, config.cards.paywall.triggers.myIntersectionTrigger.spec.selector);

		const cardExists = await isCardExisting(
			browser,
			config.cards.paywall.cardSelector
		);

		expect(cardExists).equal(true);

		const isAtPromotedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.paywall.cardSelector,
			config.cards.paywall.snapPoints.promoted
		);

		expect(isAtPromotedSnapPoint).equal(true);
	});

	it('activate card by click', async() => {
		await touchCard(browser, config.cards.paywall.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('close card pressing close button', async() => {
		await scrollCard(browser, config.cards.paywall.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.paywall.cardSelector,
			config.cards.paywall.snapPoints.initial,
			async()=>{
				await closeCard(browser);
			}
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card attaches to end of page for infinite scroll', async() => {
		if (config.cards.paywall.features.infiniteScroll) {
			await triggerInfiniteScroll(browser);

			const isSticky = await isAttachedToEndOfPage(
				browser,
				config.cards.paywall.cardSelector,
				async() => {
					await scrollBy(browser, 50);
				}
			);

			expect(isSticky).equal(true);
		}
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.paywall.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.paywall.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.paywall.cardSelector,
				config.cards.paywall.snapPoints.minimised,
				async() => {
					await minimizeCard(browser, config.cards.paywall.cardSelector);
				}
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});

	it('remove card, should still be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.gated.cardSelector
		);

		const firstCard = await browser.$(config.cards.gated.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});
};

describe('gated content experience', gatedContentTest);

exports.default = gatedContentTest;
