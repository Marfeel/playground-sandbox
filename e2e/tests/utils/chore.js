const getTypeOfProgression = (arr) => {
	const diff = arr[1] - arr[0];
	const ratio = arr[1] / arr[0];

	let arith = true;
	let geo = true;

	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i + 1] - arr[i] !== diff) { arith = false; }
		if (arr[i + 1] / ratio !== arr[i]) { geo = false; }
	}

	if (arith === true) { return 'arithmetic'; } else if (geo === true) { return ' geometric'; }

	return -1;
};

const waitUntil = async(browser, evaluate, expected, { timeout=10000, interval=500, timeoutMsg }, onRetry) => {
	return await browser.waitUntil(async() => {
		const result = await evaluate();
		const matches = typeof expected !== 'function' ? expected === result : (await expected(result));

		if (!matches && !!onRetry) {
			await onRetry();
		}

		return matches;
	}, {
		timeout,
		interval,
		timeoutMsg
	});
};

module.exports = {
	getTypeOfProgression,
	waitUntil
};
