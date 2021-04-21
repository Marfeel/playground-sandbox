const scrollCard = async(browser, cardSelector, y) => {
	return await browser.executeAsync(
		async(cardSelectorBrowser, yBrowser, done) => {
			const cardElement = document.querySelector(cardSelectorBrowser);

			cardElement.parentElement.scroll(0, yBrowser);

			done();
		}, cardSelector, y);
};

module.exports = {
	scrollCard
};
