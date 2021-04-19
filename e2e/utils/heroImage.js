
const hasHeroImage = async(browser, cardSelector) => {
	const heroImagePresent = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const heroElement = document.querySelector(cardSelectorBrowser)
			.parentElement.querySelector('#mrf-hero-element');

		done(!!heroElement);
	}, cardSelector);

	return heroImagePresent;
};

module.exports = {
	hasHeroImage
};
