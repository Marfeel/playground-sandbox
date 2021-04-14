
const playgroundUrlPlaceholders = '${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}';

const getCardAMPContent = async(browser, cardSelector) => {
	const contentInfo = await browser.executeAsync(async(cardSelector, done) => {
		const amp = document.querySelector(`${cardSelector} article`).firstElementChild.shadowRoot.AMP;
		const info = { url: amp.url, title: amp.title };

		done(info);
	}, cardSelector);

	return contentInfo;
};

const isCardContentLoaded = async(browser, cardSelector, contentConfig) => {
	const expectedUrl = contentConfig.url.includes(playgroundUrlPlaceholders) ?
		contentConfig.url.replace(playgroundUrlPlaceholders, '') :
		contentConfig.url;

	const contentInfo = await getCardAMPContent(browser, cardSelector);

	return contentInfo.url.includes(expectedUrl);
};

module.exports = {
	isCardContentLoaded
};
