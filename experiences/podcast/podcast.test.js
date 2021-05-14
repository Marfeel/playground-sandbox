const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { touchCard, touchElementInsideCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');
const experience = require('./podcast.json');

describe('podcast experience', function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/podcast/podcast.json'
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

		const cardExists = await isCardExisting(browser, config.cards.podcast.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.podcast.cardSelector,
			config.cards.podcast.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.podcast.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.podcast.cardSelector,
			config.cards.podcast.snapPoints.initial
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('close card pressing close button', async()=>{
		await scrollCard(browser, config.cards.podcast.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.podcast.cardSelector,
			config.cards.podcast.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.podcast.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.podcast.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.podcast.cardSelector,
				config.cards.podcast.snapPoints.minimised,
				async()=>{
					await minimizeCard(browser, config.cards.podcast.cardSelector);
				}
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});

	it('tap in the content will not activate the card', async() => {
		if (!config.cards.podcast.features.removable) {
			// utils method is called touchCard but it touches in whatever element the query selector returns
			await touchElementInsideCard(browser, config.cards.podcast.cardSelector, '#mrf-icon-play');

			const isStillAtMinimisedSnappoint = await isAtSnapPoint(
				browser,
				config.cards.podcast.cardSelector,
				config.cards.podcast.snapPoints.minimised
			);

			expect(isStillAtMinimisedSnappoint).equal(true);

			const isPlayerPaused = await browser.executeAsync(async(cardSelectorBrowser, done) => {
				const cardDocument = document
					.querySelector(`${cardSelectorBrowser} article [data-testid="amp-document-single"]`);
				const playButton = cardDocument.shadowRoot.querySelector('#mrf-icon-play');
				const checked = playButton.checked;

				done(checked);
			}, config.cards.podcast.cardSelector);

			expect(isPlayerPaused).equal(true);
		}
	});
});
