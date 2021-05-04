/* eslint-disable no-console */

async function getCurrentVerticalPosition(browser, cardSelector) {
	return await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const y = document.querySelector(cardSelectorBrowser).getBoundingClientRect().y;

		done(y);
	}, cardSelector);
}

async function verifyAbsoluteSnapPoint(browser, cardSelector, expectedAbsoluteYposition) {
	const currentAbsolutePositionYPosition = await getCurrentVerticalPosition(browser, cardSelector);

	const difference = currentAbsolutePositionYPosition - expectedAbsoluteYposition;

	console.log(`
        Expected Snappoint: ${expectedAbsoluteYposition} 
        Current Snappoint: ${currentAbsolutePositionYPosition} 
        Difference: ${difference}
    `);

	if (difference >= 5 || difference <= -5) {
		return false;
	}

	return true;
}

const verifyPercentageSnapPoint = async(browser, cardSelector, expectedSnapPointPercentage)=>{
	const currentPercentage = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const percentage = (document.querySelector(cardSelectorBrowser).getBoundingClientRect().y)/window.innerHeight;

		done(percentage);
	}, cardSelector);
	const difference = currentPercentage - expectedSnapPointPercentage;

	console.log(`
        Expected Snappoint: ${expectedSnapPointPercentage} 
        Current Snappoint: ${currentPercentage} 
        Difference: ${difference}
    `);
	if (difference >= 0.08 || difference <= -0.08) {
		return false;
	}

	return true;
};

const isAtSnapPoint = async(browser, cardSelector, snapPointValue, iterationClosure)=>{
	let verify;

	if (snapPointValue <= 1) {
		verify = verifyPercentageSnapPoint;
	} else {
		verify = verifyAbsoluteSnapPoint;
	}

	let atSnapPoint = false;

	await browser.waitUntil(async()=>{
		atSnapPoint = await verify(browser, cardSelector, snapPointValue);

		if (!!iterationClosure && !atSnapPoint) {
			await iterationClosure();
		}

		return atSnapPoint;
	}, {
		timeout: 5000,
		interval: 500,
		timeoutMsg: `Card is not at expected snapPoint: ${snapPointValue}`
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
