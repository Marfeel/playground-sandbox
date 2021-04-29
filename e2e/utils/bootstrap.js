const { waitBrowserReady, tapBrowser } = require('./browser');
const { scrollTo } = require('./scroll');

const flowcardsResourcesLoaded = async(browser)=>{
	const relevantResources = async()=>{
		return await browser.executeAsync(async(done) => {
			const resources = window.performance.getEntries('resource')
				.filter(resource=>resource.name.includes('statics/experience'));

			done(resources);
		});
	};


	await browser.waitUntil(async()=>{
		const resources = await relevantResources();

		const done = resources.length>0 && !resources.some(resource=>!resource.responseEnd);

		if (!done) {
			resources.forEach((resource)=>{
				console.log(`Resource: ${resource.name}, responseEnd: ${resource.responseEnd}`);
			});
		}

		return done;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'Relevant resources didn\'t load in time'
	});
};

const waitUntilPageLoaded = async(browser, fixture)=> {
	await waitBrowserReady(browser);

	await browser.waitUntil(
		() => async() => { //depends on selected article
			return await browser.getTitle() === fixture.articleTitle;
		},
		{ timeout: 10000, interval: 1000, timeoutMsg: `${fixture.articleTitle} didn't load correctly` }
	);

	const article = await browser.$('.fc-article');

	await browser.waitUntil(async()=>{
		const isExisting = await article.isExisting();

		return isExisting;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'Article didn\'t load'
	});

	tapBrowser(browser);

	await scrollTo(browser, 100);

	await scrollTo(browser, 0);

	const marfeelFlowcardsElement = await browser.$('marfeel-flowcards');

	await browser.waitUntil(async()=>{
		const isExisting = await marfeelFlowcardsElement.isExisting();

		return isExisting;
	}, {
		timeout: 10000,
		interval: 1000,
		timeoutMsg: 'MarfeelFlowcards element didn\'t render'
	});
};

const bootstrapExperience = async(browser, config, fixture) => {
	await browser.url(
		fixture.url
	);

	await waitUntilPageLoaded(browser, fixture);

	await flowcardsResourcesLoaded(browser);

	const cardSelectors = Object.keys(config.cards).map(id => `#${id}`);

	Object.keys(config.cards).forEach((id)=>{
		config.cards[id].cardSelector = `#${id}`;
	});

	return cardSelectors;
};

module.exports = {
	bootstrapExperience
};
