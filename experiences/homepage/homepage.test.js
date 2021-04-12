const { bootstrapExperience } = require("../../tests/utils/bootstrap");
const { scrollTo } = require("../../tests/utils/scroll");
const { touchCard } = require("../../tests/utils/touch");
const { isAtPercentageSnapPoint, isAtAbsoluteSnapPoint } = require("../../tests/utils/snapPoints");
const { expect } = require('chai');
const { getUrlFixture } = require('../../tests/utils/fixtureUrl');

describe("homepage experience", function () {
	let config;
	let fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/homepage/homepage.json',
	})

	it("setup", async function () {
		config = {
			cards: {
				homepage: {
					content: {
						type: "AMPDocument",
						url: "${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}/experiences/homepage/homepage.html"
					},
					snapPoints: {
						initial: 0.7,
						minimised: 0.85,
						promoted: 176,
						active: 80
					},
					features: {
						mode: "modal",
						isDraggable: true,
						button: {
							action: "setSnapPoint:initial"
						},
						infiniteScroll: true,
						header: {
							dragHandlerBg: "#282346"
						}
					},
					triggers: {
						myScrollTrigger: {
							on: "scroll",
							spec: {
								type: "absolute",
								pixel: 300,
								percentage: 0.1
							}
						}
					}
				}
			}
		}
		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example',
		}

		await bootstrapExperience(browser, config, fixture);
	});

	it("card should render on scroll", async function () {
		await scrollTo(browser, 400)

		const firstCard = await browser.$(config.cards.homepage.cardSelector);

		const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

		expect(firstCardExists).equal(true);
	});

	it("card should be displayed in viewport at initial snap point", async ()=>{
		await scrollTo(browser, 800)

		const firstCard = await browser.$(config.cards.homepage.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtPercentageSnapPoint(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial)

		expect(isAtInitialSnapPoint).equal(true);
	});

	//TODO To fix this failing test
	// it("minimise card and should be at minimised snap point", async ()=>{
 	// 	await dragCardBy(browser, config.cards.homepage.cardSelector, 150)

	// 	const isAtMinimisedSnapPoint = await isAtPercentageSnapPoint(browser,
	// 		config.cards.homepage.cardSelector,
	// 		config.cards.homepage.snapPoints.minimised)

	// 	expect(isAtMinimisedSnapPoint).equal(true);
	// });

	it("activate card by click", async ()=>{
		await touchCard(browser, config.cards.homepage.cardSelector)

		let isAtActiveSnapPoint;
		await browser.waitUntil(async ()=>{
			isAtActiveSnapPoint = await isAtAbsoluteSnapPoint(browser,
				config.cards.homepage.cardSelector,
				config.cards.homepage.snapPoints.active)

				return isAtActiveSnapPoint;
		}, {
			timeout:5000
		});

	   expect(isAtActiveSnapPoint).equal(true);
   });
});
