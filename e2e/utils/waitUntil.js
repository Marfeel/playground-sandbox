const waitUntil = async(browser, evaluate, expected, { timeout=10000, interval=500, timeoutMsg }, onRetry)=>{
	return await browser.waitUntil(async()=>{
		const result = await evaluate();

		if (result !== expected && !!onRetry) {
			await onRetry();
		}

		return result;
	}, {
		timeout,
		interval,
		timeoutMsg
	});
};

module.exports = {
	waitUntil
};
