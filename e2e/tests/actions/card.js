/* eslint-disable no-console */
const { scroll } = require('../gestures');

const triggerInfiniteScroll = async(browser)=>{
	const height = await browser.executeAsync(async(args, done) => {
		const bodyHeight = document.body.scrollHeight;

		done(bodyHeight);
	}, '');

	await scroll.scrollToAbsolutePosition(browser, height-50);
	await scroll.scrollTo(browser, height, 10);
};

module.exports = {
	triggerInfiniteScroll
};