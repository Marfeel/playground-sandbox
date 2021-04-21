const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { triggerInfiniteScroll, isAttachedToEndOfPage } = require('../../e2e/utils/infiniteScroll');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./comments.json');

const commentsTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/comments/comments.json'
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

		const firstCard = await browser.$(config.cards.topArticles.cardSelector);

		const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

		expect(firstCardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(browser,
			config.cards.topArticles.cardSelector,
			config.cards.topArticles.content);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.topArticles.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.topArticles.cardSelector,
			config.cards.topArticles.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('activate card by click', async()=>{
		await touchCard(browser, config.cards.topArticles.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(browser,
			config.cards.topArticles.cardSelector,
			config.cards.topArticles.snapPoints.active);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('close card pressing close button', async()=>{
		await scrollCard(browser, config.cards.topArticles.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.topArticles.cardSelector,
			config.cards.topArticles.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card attaches to end of page for infinite scroll', async()=>{
		if (config.cards.topArticles.features.infiniteScroll) {
			await triggerInfiniteScroll(browser);

			const isSticky = await isAttachedToEndOfPage(browser, config.cards.topArticles.cardSelector);

			expect(isSticky).equal(true);
		}
	});
};

describe('comments card experience', commentsTest);

exports.default = commentsTest;
