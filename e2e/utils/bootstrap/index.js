const { waitUntilBrowserReady, initialUserInteraction } = require('../browser');
const { waitUntilResourcesLoaded } = require('./resources');
const { waitUntilPageIsLoaded } = require('./page');
const { waitUntilExperienceEventsFired } = require('./events');

const bootstrapExperience = async(browser, config, fixture) => {
	await browser.url(
		fixture.url
	);

	await waitUntilBrowserReady(browser);

	await waitUntilPageIsLoaded(browser, fixture);

	await initialUserInteraction(browser);

	await waitUntilResourcesLoaded(browser);

	await waitUntilExperienceEventsFired(browser);

	const cardSelectors = Object.keys(config.cards).map(id => `#${id}`);

	Object.keys(config.cards).forEach((id)=>{
		config.cards[id].cardSelector = `#${id}`;
	});

	return cardSelectors;
};

module.exports = {
	bootstrapExperience
};
