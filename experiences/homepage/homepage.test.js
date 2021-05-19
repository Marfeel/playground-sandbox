const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo, scrollToElement, scrollBy } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { isAtSnapPoint, getCurrentVerticalPosition, getTypeOfProgression } = require('../../e2e/utils/snapPoints');
const { scrollCard } = require('../../e2e/utils/card-actions/scroll');
const { minimizeCard } = require('../../e2e/utils/card-actions/minimize');
const { closeCard } = require('../../e2e/utils/card-actions/close');
const {
	triggerInfiniteScroll,
	isAttachedToEndOfPage
} = require('../../e2e/utils/infiniteScroll');
const { isCardExisting } = require('../../e2e/utils/card');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./homepage.json');

const homepageTest = function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/homepage/homepage.json'
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
		const pixels = config.cards.homepage.triggers.myScrollTrigger.spec.pixel;

		await scrollTo(browser, pixels);

		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector,
			async()=>{
				await scrollBy(browser, 50);
			}
		);

		expect(cardExists).equal(true);
	});

	it('scroll bounded', async function() {
		// Initial 300px scroll to trigger
		// First 60px transitioner doesn't made the card appear
		const initialBrowserScroll = 300 + 60;
		const smallScrollPixels = 20;
		const cardSelector = config.cards.homepage.cardSelector;
		const scrollBoundedSnapPoints = [];
		const timeout = 150;
		let currentSnapPoint;

		await scrollTo(browser, initialBrowserScroll, 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll + smallScrollPixels, 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll + (smallScrollPixels * 2), 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll + (smallScrollPixels * 3), 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		expect(getTypeOfProgression(scrollBoundedSnapPoints)).equal('arithmetic');

		scrollBoundedSnapPoints.length = 0;
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll + (smallScrollPixels * 2), 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll + smallScrollPixels, 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		await scrollTo(browser, initialBrowserScroll, 5, timeout);
		currentSnapPoint = await getCurrentVerticalPosition(browser, cardSelector);
		scrollBoundedSnapPoints.push(currentSnapPoint);

		expect(getTypeOfProgression(scrollBoundedSnapPoints)).equal('arithmetic');
	});

	it('card should be displayed in viewport at initial snap point', async() => {
		await scrollTo(browser, 610, 10);

		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card should get promoted at certain element', async() => {
		await scrollToElement(browser, config.cards.homepage.triggers.myIntersectionTrigger.spec.selector);

		const cardExists = await isCardExisting(
			browser,
			config.cards.homepage.cardSelector
		);

		expect(cardExists).equal(true);

		const isAtPromotedSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.promoted
		);

		expect(isAtPromotedSnapPoint).equal(true);
	});

	it('activate card by click', async() => {
		await touchCard(browser, config.cards.homepage.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.active
		);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it('close card pressing close button', async() => {
		await scrollCard(browser, config.cards.homepage.cardSelector, 400);

		await closeCard(browser);

		const isAtInitialSnapPoint = await isAtSnapPoint(
			browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial,
			async()=>{
				await closeCard(browser);
			}
		);

		expect(isAtInitialSnapPoint).equal(true);
	});

	it('card attaches to end of page for infinite scroll', async() => {
		if (config.cards.homepage.features.infiniteScroll) {
			await triggerInfiniteScroll(browser);

			const isSticky = await isAttachedToEndOfPage(
				browser,
				config.cards.homepage.cardSelector,
				async() => {
					await scrollBy(browser, 50);
				}
			);

			expect(isSticky).equal(true);
		}
	});

	it('minimize card dragging it down when status is "initial"', async() => {
		if (!config.cards.homepage.features.removable) {
			// Restore initial status after infinite scroll
			await scrollBy(browser, -1800);
			await minimizeCard(browser, config.cards.homepage.cardSelector);

			const isAtMinimizedSnapPoint = await isAtSnapPoint(
				browser,
				config.cards.homepage.cardSelector,
				config.cards.homepage.snapPoints.minimised,
				async() => {
					await minimizeCard(browser, config.cards.homepage.cardSelector);
				}
			);

			expect(isAtMinimizedSnapPoint).equal(true);
		}
	});
};

describe('homepage experience', homepageTest);

exports.default = homepageTest;
