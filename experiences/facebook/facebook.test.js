const { bootstrapExperience } = require('../../e2e/utils/bootstrap/index');
const { scrollTo } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./facebook.json');
const { waitUntil } = require('../../e2e/utils/waitUntil');
const { getTechnology, isWebVersion } = require('../../e2e/utils/technology');

const facebookTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: getTechnology(),
		experienceUrl: '/experiences/facebook/facebook.json'
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

		const cardExists = await isCardExisting(browser, config.cards.facebook.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		if (isWebVersion()) {
			const rightContentLoaded = await isCardContentLoaded(
				browser,
				config.cards.facebook.cardSelector,
				config.cards.facebook.content
			);

			expect(rightContentLoaded).equal(true);
		}
	});

	it('card should be displayed in viewport at active snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.facebook.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.facebook.cardSelector,
			config.cards.facebook.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('remove card, should not be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.facebook.cardSelector
		);

		await waitUntil(browser, async()=>{
			const firstCard = await browser.$(config.cards.facebook.cardSelector);

			const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

			return firstCardIsInViewport;
		}, false, {
			interval: 1000,
			timeoutMsg: 'Card was still in viewport after removing it.'
		}, async()=>{
			await removeCard(
				browser,
				config.cards.facebook.cardSelector
			);
		});
	});
};

describe('facebook experience', facebookTest);

exports.default = facebookTest;
