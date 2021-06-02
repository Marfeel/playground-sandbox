const { chore } = require('../../utils');

const pageTitleMatches = async(browser, expectedTitle)=>{
	return await browser.getTitle() === expectedTitle;
};

const articleElementLoaded = async(browser, articleElement)=>{
	return await articleElement.isExisting();
};

const experiencePageLoaded = async(browser, fixtureUrl)=>{
	const url = await browser.executeAsync(async(done) => {
		const href = window.location.href;

		done(href);
	});

	return url === fixtureUrl;
};

const waitUntilPageIsLoaded = async(browser, fixture)=> {
	await chore.waitUntil(browser,
		experiencePageLoaded.bind(null, browser, fixture.url),
		true, { timeoutMsg: 'Page took to long to load' });

	await chore.waitUntil(browser, pageTitleMatches.bind(null,
		browser,
		fixture.articleTitle),
	true,
	{ timeoutMsg: `${fixture.articleTitle} didn't load correctly` });

	const article = await browser.$('.fc-article');

	await chore.waitUntil(browser, articleElementLoaded.bind(null, browser, article), true, {
		timeoutMsg: 'Article didn\'t load'
	});
};

module.exports = {
	waitUntilPageIsLoaded
};
