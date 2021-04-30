const isCardExisting = async(browser, cardSelector, iterationFunction) => {
	let exists = false;

	await browser.waitUntil(async()=>{
		const card = await browser.$(cardSelector);

		try {
			exists = await card.waitForExist({ timeout: 500 });
		} catch (e) {
			if (!!iterationFunction) {
				await iterationFunction();
			}
		}

		return exists;
	}, {
		timeout: 10000,
		interval: 500,
		timeoutMsg: 'Card didn\'t exist'
	});

	return exists;
};

module.exports = {
	isCardExisting
};
