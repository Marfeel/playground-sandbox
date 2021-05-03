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

module.exports = {
	isAtSnapPoint
};
