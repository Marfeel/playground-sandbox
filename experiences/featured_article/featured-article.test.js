const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { hasHeroImage } = require('../../e2e/utils/heroImage.js');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { triggerInfiniteScroll, isAttachedToEndOfPage } = require('../../e2e/utils/infiniteScroll');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./featured_article.json');

const featuredArticleTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/featured_article/featured_article.json'
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
		await scrollTo(browser, 400);

		const cardExists = await isCardExisting(browser, config.cards.heroImage.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(browser,
			config.cards.heroImage.cardSelector,
			config.cards.heroImage.content);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.heroImage.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.heroImage.cardSelector,
			config.cards.heroImage.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card should have a hero image', async()=>{
		const hasHeroImg = await hasHeroImage(browser, config.cards.heroImage.cardSelector);

		expect(hasHeroImg).equal(true);
	});

	it('activate card by click', async()=>{
		await touchCard(browser, config.cards.heroImage.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(browser,
			config.cards.heroImage.cardSelector,
			config.cards.heroImage.snapPoints.active);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('close card pressing close button', async()=>{
		await scrollCard(browser, config.cards.heroImage.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.heroImage.cardSelector,
			config.cards.heroImage.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card attaches to end of page for infinite scroll', async()=>{
		if (config.cards.heroImage.features.infiniteScroll) {
			await triggerInfiniteScroll(browser);

			const isSticky = await isAttachedToEndOfPage(
				browser,
				config.cards.heroImage.cardSelector,
				async() => {
					await scrollBy(browser, 50);
				}
			);

			expect(isSticky).equal(true);
		}
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.heroImage.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.heroImage.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.heroImage.cardSelector,
				config.cards.heroImage.snapPoints.minimised
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});
};

describe('featured article experience', featuredArticleTest);

exports.default = featuredArticleTest;
