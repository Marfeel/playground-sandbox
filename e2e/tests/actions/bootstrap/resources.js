const { browser: { initialUserInteraction }, chore } = require('../../utils');

const relevantResourcesLoaded = async(browser)=>{
	const resources = await browser.executeAsync(async(done) => {
		const res = window.performance.getEntries('resource')
			.filter(resource=>resource.name.includes('statics/experience'));

		done(res);
	});

	const loaded = resources.length>0 && !resources.some(resource=>!resource.responseEnd);

	if (!loaded) {
		resources.forEach((resource)=>{
			console.log(`Resource: ${resource.name}, responseEnd: ${resource.responseEnd}`);
		});
	}

	return loaded;
};

const waitUntilResourcesLoaded = async(browser)=>{
	await chore.waitUntil(browser,
		relevantResourcesLoaded.bind(null, browser), true, {
			timeout: 10000,
			interval: 1000,
			timeoutMsg: 'Relevant resources didn\'t load in time'
		}, initialUserInteraction.bind(null, browser));
};

module.exports = {
	waitUntilResourcesLoaded
};
