const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardExisting } = require('../../e2e/utils/card');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const { getFlowcardJson } = require('../../e2e/utils/croupier');
const { expect } = require('chai');

const brandedContentTest = function() {
	let config,
		fixture;
	// eslint-disable-next-line max-len
	const fixtureUrl = getUrlFixture({}, 'https://playground.mrf.io/simulate?siteUrl=https://playground.marfeel.com/templates/branded-content-article.html&requestHostname=playground.marfeel.com&experienceUrl=croupier');

	it('setup', async function() {
		// eslint-disable-next-line max-len
		config = await getFlowcardJson({}, 'https://flowcards.mrf.io/json/web?site_id=120&client_id=fec803ab-7426-4617-ab35-806db795b85c&canonical_url=https%3A%2F%2Fplayground.mrf.io%2Fsimulate%3FsiteUrl%3Dhttps%253A%252F%252Fplayground.marfeel.com%252Ftemplates%252Fbranded-content-article.html%26requestHostname%3Dplayground.marfeel.com%26experienceUrl%3Dcroupier&referrer=https%3A%2F%2Fplayground.marfeel.com&geo=__INJECT_GEO__&dynamic_flowcards=%5B%7B%22name%22%3A%22BrandedContentFlowcard%22%2C%22relevance%22%3A100%2C%22url%22%3A%22https%3A%2F%2Fplayground.marfeel.com%2Fexperiences%2Fbranded-content%2Fbranded-content-card.html%22%2C%22renderProps%22%3A%22%7B%5C%22content%5C%22%3A%7B%5C%22type%5C%22%3A%5C%22AMPDocument%5C%22%2C%5C%22url%5C%22%3A%5C%22https%3A%2F%2Fplayground.marfeel.com%2Fexperiences%2Fbranded-content%2Fbranded-content-card.html%5C%22%7D%2C%5C%22snapPoints%5C%22%3A%7B%5C%22initial%5C%22%3A0.75%2C%5C%22promoted%5C%22%3A176%2C%5C%22active%5C%22%3A210%7D%2C%5C%22features%5C%22%3A%7B%5C%22mode%5C%22%3A%5C%22modal%5C%22%2C%5C%22isDraggable%5C%22%3Atrue%2C%5C%22button%5C%22%3A%7B%5C%22action%5C%22%3A%5C%22setSnapPoint%3Ainitial%5C%22%7D%2C%5C%22removable%5C%22%3Atrue%2C%5C%22transition%5C%22%3A%5C%22scrollBounded%5C%22%2C%5C%22infiniteScroll%5C%22%3Atrue%2C%5C%22heroElement%5C%22%3A%7B%5C%22src%5C%22%3A%5C%22https%3A%2F%2Fplayground.marfeel.com%2Fassets%2Fexperiences%2Fheader-branded-dfp.png%3Fd1%5C%22%7D%7D%2C%5C%22triggers%5C%22%3A%7B%5C%22scrollTrigger%5C%22%3A%7B%5C%22on%5C%22%3A%5C%22scroll%5C%22%2C%5C%22spec%5C%22%3A%7B%5C%22type%5C%22%3A%5C%22absolute%5C%22%2C%5C%22pixel%5C%22%3A300%2C%5C%22percentage%5C%22%3A0.1%7D%7D%7D%7D%22%7D%5D');

		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example'
		};

		await bootstrapExperience(browser, config, fixture);

		//custom content url:
		// eslint-disable-next-line max-len
		config.cards.BrandedContentFlowcard.content.url = 'https://playground.marfeel/experiences/branded-content/branded-content-article.html';
	});

	it('card should render on scroll', async function() {
		await scrollTo(browser, 800);

		const cardExists = await isCardExisting(browser, config.cards.BrandedContentFlowcard.cardSelector);

		expect(cardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(browser,
			config.cards.BrandedContentFlowcard.cardSelector,
			config.cards.BrandedContentFlowcard.content);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 1600);

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

	it('close card pressing close button', async()=>{
		await scrollCard(browser, config.cards.BrandedContentFlowcard.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.BrandedContentFlowcard.cardSelector,
			config.cards.BrandedContentFlowcard.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});
};

describe('branded content experience', brandedContentTest);

exports.default = brandedContentTest;
