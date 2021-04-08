const { bootstrapExperience } = require("../../tests/utils/bootstrap");
const { scrollTo } = require("../../tests/utils/scroll");
const { dragCardTo } = require("../../tests/utils/touch");
const { expect } = require('chai');
const config = require('../../tests/fixtures/config-multiple-cards.json');


describe("multiple cards", function () {
	let cardSelectors, fixture;

	it("setup", async function () {
		fixture = {
			url: 'https://bs-local.com:4567/test.html',
			articleTitle: 'Marfeel Flowcards',
		}

		//LOAD PAGE
		cardSelectors = await bootstrapExperience(browser, config, fixture);
	});
	
	it("show first card", async function () {
		//TRIGGER FIRST CARD
		await scrollTo(browser, 1000)
		
		const firstCard = await browser.$(`${cardSelectors[0]}`);
		
		const exists = await firstCard.waitForExist({ timeout: 5000 });

		expect(exists).equal(true);
		
		const firstCardVisible = await firstCard.isDisplayedInViewport();

		expect(firstCardVisible).equal(true);
	});
	
	it("show second card", async function () {
		//TRIGGER SECOND CARD
		await scrollTo(browser, 2800)

		const secondCard = await browser.$(`${cardSelectors[1]}`);
	
		await secondCard.waitForExist({ timeout: 5000 });
		
		const secondCardVisible1 = await secondCard.isDisplayedInViewport();

		expect(secondCardVisible1).equal(true);
	});

	it("hide second card", async function () {
		//second card down
		const windowSize = await browser.getWindowSize();

		await dragCardTo(browser, `${cardSelectors[1]}`, windowSize.height-5)

		const secondCard = await browser.$(`${cardSelectors[1]}`);

		const secondCardVisible2 = await secondCard.isDisplayedInViewport();

		expect(secondCardVisible2).equal(false);
	});

	it("open first card", async function () {
		//first card open
		await dragCardTo(browser, `${cardSelectors[0]}`, 100)

		const firstCard = await browser.$(`${cardSelectors[0]}`);

		const firstCardVisible2 = await firstCard.isDisplayedInViewport();

		expect(firstCardVisible2).equal(true);
	});
});
