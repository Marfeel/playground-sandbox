const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollToElement, scrollBy } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const {
	triggerInfiniteScroll,
	isAttachedToEndOfPage
} = require('../../e2e/utils/infiniteScroll');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./homepage.json');

const homepageTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/homepage/homepage.json'
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
		await scrollToElement(browser, config.cards.homepage.triggers.myScrollTrigger.spec.selector);
		await scrollTo(browser, 200);

		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async() => {
		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial,
			async()=>{
				await scrollBy(browser, 20);
			}
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('activate card by click', async() => {
		await touchCard(browser, config.cards.homepage.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('close card pressing close button', async() => {
		await scrollCard(browser, config.cards.homepage.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card attaches to end of page for infinite scroll', async() => {
		if (config.cards.homepage.features.infiniteScroll) {
			await triggerInfiniteScroll(browser);

			const isSticky = await isAttachedToEndOfPage(
				browser,
				config.cards.homepage.cardSelector
			);

			expect(isSticky).equal(true);
		}
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.homepage.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.homepage.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.homepage.cardSelector,
				config.cards.homepage.snapPoints.minimised
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});

	it('when scrolling a few pixels down, the card pops up the same amount of pixels', async() => {
		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);

		//Make the card appear a little bit
		await scrollBy(browser, 100);

		// Test scroll bounce
		let isAtExpectedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.minimised
		);

		expect(isAtExpectedSnapPoint).equal(true);

		await scrollBy(browser, 20);

		isAtExpectedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.minimised - 0.1
		);
		expect(isAtExpectedSnapPoint).equal(true);

		await scrollBy(browser, 20);

		isAtExpectedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.minimised - 0.2
		);
		expect(isAtExpectedSnapPoint).equal(true);
	});

	it('when scrolling a few pixels up, the card hides the same amount of pixels', async() => {
		// small scroll up bounds
		await scrollBy(browser, -20);
		let isAtExpectedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.minimised - 0.1
		);

		expect(isAtExpectedSnapPoint).equal(true);

		// small scroll up bounds
		await scrollBy(browser, -20);
		isAtExpectedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.minimised
		);
		expect(isAtExpectedSnapPoint).equal(true);
	});

	it('card should render on scroll', async function() {
		await scrollTo(browser, 400);

		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);
	});
};

describe('homepage experience', homepageTest);

exports.default = homepageTest;
