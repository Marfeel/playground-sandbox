const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const { expect } = require('chai');

describe('branded content experience', function() {
	let config,
		fixture;
	// eslint-disable-next-line max-len
	const fixtureUrl = getUrlFixture({}, 'https://playground.mrf.io/simulate?siteUrl=https://playground.marfeel.com/templates/branded-content-article.html&requestHostname=playground.marfeel.com&experienceUrl=croupier');

	it('setup', async function() {
		config = {
			cards: {
				BrandedContentFlowcard: {
					content: {
						type: 'AMPDocument',
						// eslint-disable-next-line max-len
						url: '${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}/experiences/branded-content/branded-content-article.html'
					},
					snapPoints: {
						initial: 0.75,
						active: 0.33
					}
				}
			}
		};
		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example'
		};

		await bootstrapExperience(browser, config, fixture);
	});

	it('card should render on scroll', async function() {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.BrandedContentFlowcard.cardSelector);

		const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

		expect(firstCardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(browser,
			config.cards.BrandedContentFlowcard.cardSelector,
			config.cards.BrandedContentFlowcard.content);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.BrandedContentFlowcard.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.BrandedContentFlowcard.cardSelector,
			config.cards.BrandedContentFlowcard.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('activate card by click', async()=>{
		await touchCard(browser, config.cards.BrandedContentFlowcard.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(browser,
			config.cards.BrandedContentFlowcard.cardSelector,
			config.cards.BrandedContentFlowcard.snapPoints.active);

		expect(isAtActiveSnapPoint).equal(true);
	});
});
