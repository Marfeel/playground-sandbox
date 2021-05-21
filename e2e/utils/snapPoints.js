/* eslint-disable no-console */

async function getCurrentVerticalPosition(browser, cardSelector) {
	return await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const y = document.querySelector(cardSelectorBrowser).getBoundingClientRect().y;

		done(y);
	}, cardSelector);
}

const verifySnapPoint = async(browser, cardSelector, value) => {
	const { card, positioner } = await browser.executeAsync(async(cardSelector, done) => {
		const positioner = document.querySelector(cardSelector).closest('[data-testid=card-positioner]').getBoundingClientRect();
		const card = document.querySelector(`${cardSelector} [data-testid=card]`).getBoundingClientRect();

		done({ card, positioner });
	}, cardSelector);

	/**
	 * Make sure to keep this compensation matching the one we are doing inside flowcards code:
	 * https://github.com/Marfeel/flowcards/blob/master/packages/experience-web/src/transitioner/useAbsoluteSnapPoints/useAbsoluteSnapPoints.tsx#L46
	 */
	const HIGH_SCREEN_THRESHOLD = 0.5;
	const compensation = (card.y / positioner.height) > HIGH_SCREEN_THRESHOLD ? positioner.y : 0;
	const current = card.y - compensation;
	const expected = value > 1 ? value : value * positioner.height;

	const difference = current - expected;

	console.log(`
        Expected Snappoint: ${expected} 
        Current Snappoint: ${current} 
        Difference: ${difference}
    `);

	if (isNaN(difference) || difference >= 5 || difference <= -5) {
		return false;
	}

	return true;
};

const isAtSnapPoint = async(browser, cardSelector, snapPointValue, iterationClosure) => {
	const value = typeof snapPointValue !== 'object' ? snapPointValue : snapPointValue.value;

	let atSnapPoint = false;

	await browser.waitUntil(async()=>{
		atSnapPoint = await verifySnapPoint(browser, cardSelector, value);

		if (!!iterationClosure && !atSnapPoint) {
			await iterationClosure();
		}

		return atSnapPoint;
	}, {
		timeout: 5000,
		interval: 2500,
		timeoutMsg: `Card is not at expected position: ${value}`
	});

	return atSnapPoint;
};

function getTypeOfProgression(arr) {
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
}

module.exports = {
	getTypeOfProgression,
	getCurrentVerticalPosition,
	isAtSnapPoint
};
