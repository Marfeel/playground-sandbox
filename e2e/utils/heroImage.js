const { isWebVersion } = require('./technology');

const hasHeroImage = async(browser, cardSelector) => {
	const heroImageSelector = isWebVersion()
		? '#mrf-hero-element'
		: '#mrf-hero-element-image img';
	const heroImagePresent = await browser.executeAsync(async(heroImageSelectorBrowser, done) => {
		const heroImageElement = document.querySelector(heroImageSelectorBrowser);

		done(!!heroImageElement);
	}, heroImageSelector);

	return heroImagePresent;
};

module.exports = {
	hasHeroImage
};
