const getCardPositionerStyles = async(browser, cardSelector)=>{
	const cardPositionerStyle = await browser.executeAsync(async(cardSelector, done) => {
        const positioner = document.querySelector(cardSelector).closest('[data-testid=card-positioner]')
		const style = positioner.getAttribute('style');

		done(style);
	}, cardSelector);

	return cardPositionerStyle;
};

module.exports = {
	getCardPositionerStyles
};