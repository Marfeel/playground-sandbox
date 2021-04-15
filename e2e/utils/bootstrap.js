const { waitBrowserReady, tapBrowser } = require('./browser');
const { scrollTo } = require('./scroll');

const bootstrapExperience = async(browser, config, fixture) => {
	await browser.url(
		fixture.url
	);

	await browser.waitUntil(
		() => async() => { //depends on selected article
			return await browser.getTitle() === fixture.articleTitle;
		},
		{ timeout: 10000, interval: 1000 }
	);

	await waitBrowserReady(browser);

	tapBrowser(browser);

	await scrollTo(browser, 100);

	await scrollTo(browser, 0);

	await browser.pause(1000);

	await waitBrowserReady(browser);

	const cardSelectors = Object.keys(config.cards).map(id => `#${id}`);

	Object.keys(config.cards).forEach((id)=>{
		config.cards[id].cardSelector = `#${id}`;
	});

	return cardSelectors;
};

module.exports = {
	bootstrapExperience
};
