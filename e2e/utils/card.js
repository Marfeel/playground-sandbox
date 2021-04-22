const { scrollBy } = require('./scroll');

const isCardExisting = async(browser, cardSelector) => {


	let exists = false;

	await browser.waitUntil(async()=>{
		const card = await browser.$(cardSelector);

		exists = await card.waitForExist({ timeout: 1000 });

		await scrollBy(browser, 20);

		return exists;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'Card didn\'t exist'
	});

	return exists;
};

module.exports = {
	isCardExisting
};
