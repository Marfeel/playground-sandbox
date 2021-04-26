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

module.exports = {
	isCardExisting
};
