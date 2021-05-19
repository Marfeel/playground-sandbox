const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { isCardExisting } = require('../../e2e/utils/card');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./multicard.json');

const multicardTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/multicard/multicard.json'
	});

	it('setup', async function() {
		config = experience;
		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example'
		};

		await bootstrapExperience(browser, config, fixture);
	});

	it('card 1 should render on scroll', async function() {
		await scrollTo(browser, 400);

		const cardExists = await isCardExisting(browser, config.cards.homepage.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card 1 should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.homepage.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card 2 should render on scroll', async function() {
		await scrollTo(browser, 4000);

		const cardExists = await isCardExisting(browser, config.cards.nextArticle.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card 2 should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 4200);

		const firstCard = await browser.$(config.cards.nextArticle.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.nextArticle.cardSelector,
			config.cards.nextArticle.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('activate card 2 by click', async()=>{
		await touchCard(browser, config.cards.nextArticle.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(browser,
			config.cards.nextArticle.cardSelector,
			config.cards.nextArticle.snapPoints.active);

		expect(isAtActiveSnapPoint).equal(true);
	});

	// it('remove card, should not be displayed in viewport', async function() {
	// 	await removeCard(
	// 		browser,
	// 		config.cards.nextArticle.cardSelector
	// 	);

	// 	const firstCard = await browser.$(config.cards.nextArticle.cardSelector);

	// 	const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

	// 	expect(firstCardIsInViewport).equal(false);
	// });
};

describe('multicard experience', multicardTest);

exports.default = multicardTest;
