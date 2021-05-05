const { waitUntil } = require('../waitUntil');
const { initialUserInteraction } = require('../browser');

const eventsGotFired = async(browser)=>{
	const events = await browser.executeAsync(async(done) => {
		const resources = window.performance.getEntries('resource')
			.filter(resource=>resource.name.includes('/event'));

		done(resources);
	});

	const eventsFired = events.length > 1 && !events.some(resource=>!resource.responseEnd);

	if (!eventsFired) {
		events.forEach((resource)=>{
			console.log(`Event: ${resource.name}, responseEnd: ${resource.responseEnd}`);
		});
	}

	return eventsFired;
};

const waitUntilExperienceEventsFired = async(browser) => {
	await waitUntil(browser, eventsGotFired.bind(null, browser), true, {
		interval: 1000,
		timeout: 60000,
		timeoutMsg: 'Experience events didn\'t fire in time'
	}, initialUserInteraction.bind(null, browser));
};


module.exports = {
	waitUntilExperienceEventsFired
};
