const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./paywall.json');


const paywallTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/paywall/paywall.json'
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
		const pixels = config.cards.newsletter.triggers.myScrollTrigger.spec.pixel;

		await scrollTo(browser, pixels);

		const cardExists = await isCardExisting(
			browser,
			config.cards.newsletter.cardSelector,
			async()=>{
				await scrollTo(browser, 0);
				await scrollTo(browser, pixels);
			}
		);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.newsletter.cardSelector,
			config.cards.newsletter.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at active snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.newsletter.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.newsletter.cardSelector,
			config.cards.newsletter.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('remove card, should still be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.newsletter.cardSelector
		);

		const firstCard = await browser.$(config.cards.newsletter.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.newsletter.cardSelector,
			config.cards.newsletter.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});
};

describe('paywall experience', paywallTest);

exports.default = paywallTest;
