const getCardPositionerStyles = async(browser, cardSelector) => {
	const cardPositionerStyle = await browser.executeAsync(async(cardSelector, done) => {
        const positioner = document.querySelector(cardSelector).closest('[data-testid=card-positioner]')
		const style = positioner.getAttribute('style');

		done(style);
	}, cardSelector);

	return cardPositionerStyle;
};

const getElementStyles = async(browser, elementSelector) => {
	const elementStyles = await browser.executeAsync(async(elementSelector, done) => {
		const element = document.querySelector(elementSelector);
		const style = element.getAttribute('style');

		done(style);
	}, elementSelector);

	return elementStyles;
};

module.exports = {
    getCardPositionerStyles,
    getElementStyles
};