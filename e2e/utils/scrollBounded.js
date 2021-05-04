
const { isAtSnapPoint,
	getCardAbsolutePositionY,
	HIDDEN_SNAPPOINT,
	closeEnough } = require('./snapPoints');
const { expect } = require('chai');
const { getBrowserInnerSizes } = require('./browser');
const { scrollTo } = require('./scroll');

const isScrollBounded = async(browser, cardSelector, initialSnappoint)=>{
	const isAtHiddenSnappoint = await isAtSnapPoint(
		browser,
		cardSelector,
		HIDDEN_SNAPPOINT
	);

	expect(isAtHiddenSnappoint).equal(true);


	const { y } = await getBrowserInnerSizes(browser);

	const hiddenAbsolutePosition = await getCardAbsolutePositionY(browser, cardSelector);
	const initialAbsolutePosition = initialSnappoint <= 1 ? initialSnappoint * y : initialSnappoint;
	const scrollBoundRatio = (hiddenAbsolutePosition - initialAbsolutePosition) / ((0.8-0.2)*300);
	let	currentAbsolutePosition;

	console.log('scrollboundratio', scrollBoundRatio, '=', ` (${hiddenAbsolutePosition} - ${initialAbsolutePosition}) / ((0.8-0.2)*300)`);
	//first 60
	await scrollTo(browser, 360, 5);

	currentAbsolutePosition = await getCardAbsolutePositionY(browser, cardSelector);

	console.log(hiddenAbsolutePosition, currentAbsolutePosition);
	// expect(hiddenAbsolutePosition).equal(currentAbsolutePosition);

	//next 30
	await scrollTo(browser, 390, 5);

	currentAbsolutePosition = await getCardAbsolutePositionY(browser, cardSelector);

	console.log(hiddenAbsolutePosition, currentAbsolutePosition);

	//next 30
	await scrollTo(browser, 420, 5);

	currentAbsolutePosition = await getCardAbsolutePositionY(browser, cardSelector);

	console.log(hiddenAbsolutePosition, currentAbsolutePosition);

	//next 30
	await scrollTo(browser, 450, 5);

	currentAbsolutePosition = await getCardAbsolutePositionY(browser, cardSelector);

	console.log(hiddenAbsolutePosition, currentAbsolutePosition);

	return true;
};

module.exports = {
	isScrollBounded
};
