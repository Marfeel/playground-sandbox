
const playgroundUrlPlaceholders = '${PLAYGROUND_PROXY}/${CURRENT_HOSTNAME}';

const getCardAMPContent = async(browser, cardSelector) => {
	const contentInfo = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const amp = document.querySelector(`${cardSelectorBrowser} article`).firstElementChild.shadowRoot.AMP;
		const info = { url: amp.url, title: amp.title };

		done(info);
	}, cardSelector);

	return contentInfo;
};

const isCardContentLoaded = async(browser, cardSelector, contentConfig) => {
	let loaded = false;

	const expectedUrl = contentConfig.url.includes(playgroundUrlPlaceholders) ?
		contentConfig.url.replace(playgroundUrlPlaceholders, '') :
		contentConfig.url;

	await browser.waitUntil(async()=>{
		let contentInfo = '';

		try {
			contentInfo = await getCardAMPContent(browser, cardSelector);
		} catch (e) {
			return false;
		}

		loaded = contentInfo.url.includes(expectedUrl);

		return loaded;
	}, {
		timeout: 10000,
		interval: 500,
		timeoutMsg: 'Content of the card didn\'t load'
	});


	return loaded;
};

module.exports = {
	isCardContentLoaded
};
