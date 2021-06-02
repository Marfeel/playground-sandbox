const exists = async(browser, cardSelector) => {
	const cardPresent = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const card = document.querySelector(cardSelectorBrowser);

		done(!!card);
	}, cardSelector);

	return cardPresent;
};

const getCurrentPosition = async(browser, cardSelector) => {
	return await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const y = document.querySelector(cardSelectorBrowser).getBoundingClientRect().y;

		done(y);
	}, cardSelector);
};

const getShadowRootContent = async(browser, cardSelector) => {
	const contentInfo = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const amp = document.querySelector(`${cardSelectorBrowser} article`).firstElementChild.shadowRoot.AMP;
		const info = { url: amp.url, title: amp.title };

		done(info);
	}, cardSelector);

	return contentInfo;
};

const hasHeroImage = async(browser, cardSelector) => {
	const heroImagePresent = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const heroElement = document.querySelector(cardSelectorBrowser)
			.parentElement.querySelector('#mrf-hero-element');

		done(!!heroElement);
	}, cardSelector);

	return heroImagePresent;
};

module.exports = {
	exists,
	getCurrentPosition,
	getShadowRootContent,
	hasHeroImage
};
