const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { isCardExisting } = require('../../e2e/utils/card');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./telegram.json');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');

describe('telegram experience', function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		technology: 'web',
		experienceUrl: '/experiences/telegram/telegram.json'
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

		const cardExists = await isCardExisting(browser, config.cards.telegram.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.telegram.cardSelector,
			config.cards.telegram.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at active snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.telegram.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.telegram.cardSelector,
			config.cards.telegram.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('remove card, should not be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.telegram.cardSelector
		);

		const firstCard = await browser.$(config.cards.telegram.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(false);
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.telegram.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.telegram.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.telegram.cardSelector,
				config.cards.telegram.snapPoints.minimised
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});
});
