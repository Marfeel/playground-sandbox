const calculateCurrentAndExpectedValues = async(browser, cardSelector, value) => {
	const { card, positioner } = await browser.executeAsync(async(cardSelector, done) => {
		const positioner = document.querySelector(cardSelector).closest('[data-testid=card-positioner]').getBoundingClientRect();
		const card = document.querySelector(`${cardSelector} [data-testid=card]`).getBoundingClientRect();

		done({ card, positioner });
	}, cardSelector);

	/**
	 * ⚠️ WARNING ⚠️
	 * Make sure to keep this compensation matching the one we are doing inside flowcards code:
	 * https://github.com/Marfeel/flowcards/blob/master/packages/experience-web/src/transitioner/useAbsoluteSnapPoints/useAbsoluteSnapPoints.tsx#L46
	 */
	const HIGH_SCREEN_THRESHOLD = 0.5;
	const compensation = (value > 1 ? (value / positioner.height) : value) > HIGH_SCREEN_THRESHOLD ? positioner.y : 0;
	const current = card.y - compensation;
	const expected = value > 1 ? value : value * positioner.height;

	return { current, expected };
};

const parseSnapPointValue = (snapPointValue) => {
	return typeof snapPointValue !== 'object' ? snapPointValue : snapPointValue.value;
};

module.exports = {
	calculateCurrentAndExpectedValues,
	parseSnapPointValue
};
