const { isWebVersion } = require('./technology');

const isCardExisting = async(browser, cardSelector, iterationFunction) => {
	let exists = false;

	await browser.waitUntil(async()=>{

		const card = isWebVersion() ?
			await browser.$(cardSelector) :
			browser.$('#mrf-flowcards-content-wrapper');

		try {
			exists = await card.waitForExist({ timeout: 2000 });
		} catch (e) {
			if (!!iterationFunction) {
				await iterationFunction();
			}
		}

		return exists;
	}, {
		timeout: 30000,
		interval: 3000,
		timeoutMsg: 'Card didn\'t exist'
	});

	return exists;
};

module.exports = {
	isCardExisting
};
