const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollBy } = require('../../e2e/utils/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { removeCard } = require('../../e2e/utils/card-actions/remove');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const { isContentLocker } = require('../../e2e/utils/gatedContent');
const experience = require('./gated-content.json');


const gatedContentTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		technology: 'web',
		experienceUrl: '/experiences/gated-content/gated-content.json'
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
		const pixels = config.cards.gated.triggers.myScrollTrigger.spec.pixel;

		await scrollTo(browser, pixels);

		const cardExists = await isCardExisting(
			browser,
			config.cards.gated.cardSelector,
			async()=>{
				await scrollBy(browser, 50);
			}
		);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.content
		);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at active snap point', async() => {
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.gated.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('should have lock content styles', async function() {
		const isContentLock = isContentLocker(browser, 'fc-article');

		expect(isContentLock).equal(true);
	});

	it('remove card, should still be displayed in viewport', async function() {
		await removeCard(
			browser,
			config.cards.gated.cardSelector
		);

		const firstCard = await browser.$(config.cards.gated.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.gated.cardSelector,
			config.cards.gated.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});


	
};

describe('gated content experience', gatedContentTest);

exports.default = gatedContentTest;
