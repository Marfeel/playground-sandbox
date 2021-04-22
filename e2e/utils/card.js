const { scrollBy } = require('./scroll');

const isCardExisting = async(browser, cardSelector) => {
	const card = await browser.$(cardSelector);

	let isExisting = false;

	await browser.waitUntil(async()=>{
		isExisting = await card.isExisting();

		await scrollBy(browser, 20);

		return isExisting;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'Card didn\'t exist'
	});

	return isExisting;
};

module.exports = {
	isCardExisting
};
