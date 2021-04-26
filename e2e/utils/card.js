const { scrollBy } = require('./scroll');

const isCardExisting = async(browser, cardSelector) => {
	let exists = false;

	await browser.waitUntil(async()=>{
		const card = await browser.$(cardSelector);

		try {
			exists = await card.waitForExist({ timeout: 1000 });
		} catch (e) {
			await scrollBy(browser, 20);
		}

		return exists;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'Card didn\'t exist'
	});

	return exists;
};

const waitUntilViewport = async(browser, cardSelector, expected) => {
	return await browser.waitUntil(async()=>{
		const card = await browser.$(cardSelector);

		const isInViewport = await card.isDisplayedInViewport();

		return expected === isInViewport;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: expected ? 'Card was not in viewport' : 'Card is in viewport'
	});
};


const isCardInViewport = async(browser, cardSelector) => {
	return await waitUntilViewport(browser, cardSelector, true);
};

const isCardNotInViewport = async(browser, cardSelector) => {
	return await waitUntilViewport(browser, cardSelector, false);
};

module.exports = {
	isCardExisting,
	isCardInViewport,
	isCardNotInViewport
};
