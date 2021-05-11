/* eslint-disable no-console */

async function verifyAbsoluteSnapPoint(browser, cardSelector, expectedAbsoluteYposition) {
	const currentAbsolutePositionYPosition = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const y = document.querySelector(cardSelectorBrowser).getBoundingClientRect().y;

		done(y);
	}, cardSelector);

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
	const value = typeof snapPointValue === 'number' ? snapPointValue : snapPointValue?.value;
	let verify;

	if (value <= 1) {
		verify = verifyPercentageSnapPoint;
	} else {
		verify = verifyAbsoluteSnapPoint;
	}

	let atSnapPoint = false;

	await browser.waitUntil(async()=>{
		atSnapPoint = await verify(browser, cardSelector, value);

		if (!!iterationClosure && !atSnapPoint) {
			await iterationClosure();
		}

		return atSnapPoint;
	}, {
		timeout: 5000,
		interval: 500,
		timeoutMsg: `Card is not at expected snapPoint: ${value}`
	});

	return atSnapPoint;
};

module.exports = {
	isAtSnapPoint
};
