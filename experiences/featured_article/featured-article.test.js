const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { hasHeroImage } = require('../../e2e/utils/heroImage.js');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { triggerInfiniteScroll, isAttachedToEndOfPage } = require('../../e2e/utils/infiniteScroll');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./featured_article.json');
const { getTechnology, isWebVersion } = require('../../e2e/utils/technology');

const featuredArticleTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: getTechnology(),
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
		if (isWebVersion()) {
			const rightContentLoaded = await isCardContentLoaded(browser,
				config.cards.heroImage.cardSelector,
				config.cards.heroImage.content);

			expect(rightContentLoaded).equal(true);
		}
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
		if (isWebVersion()) {
			await scrollCard(browser, config.cards.heroImage.cardSelector, 400);

			await closeCard(browser);

			const isAtInitialSnapPoint = await isAtSnapPoint(browser,
				config.cards.heroImage.cardSelector,
				config.cards.heroImage.snapPoints.initial);

			expect(isAtInitialSnapPoint).equal(true);
		}
	});

	it('card attaches to end of page for infinite scroll', async()=>{
		if (isWebVersion()) {
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
		}
	});
};

describe('featured article experience', featuredArticleTest);

exports.default = featuredArticleTest;
