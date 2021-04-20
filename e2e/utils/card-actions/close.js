const closeCard = async(browser) => {
	const contentInfo = await browser.executeAsync(async(args, done) => {
		const closeButton = document.querySelector('marfeel-flowcards [data-testid="sticky-close-icon"]');

		closeButton.click();
		done();
	}, '');

	return contentInfo;
};

module.exports = {
	closeCard
};
