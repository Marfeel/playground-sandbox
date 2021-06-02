const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./app.json');


const appTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		technology: 'web',
		experienceUrl: '/experiences/app/app.json'
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
		const pixels = config.cards.app.triggers.myScrollTrigger.spec.pixel;

		await scrollTo(browser, pixels);

		const cardExists = await isCardExisting(
			browser,
			config.cards.app.cardSelector,
			async()=>{
				await scrollBy(browser, 50);
			}
		);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.app.cardSelector,
			config.cards.app.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at active snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.app.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.app.cardSelector,
			config.cards.app.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('remove card, should still be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.app.cardSelector
		);

		const firstCard = await browser.$(config.cards.app.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.app.cardSelector,
			config.cards.app.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});
};

describe('app experience', appTest);

exports.default = appTest;
