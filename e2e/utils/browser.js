
const { scrollTo, scrollToAbsolutePosition } = require('./scroll');

const waitUntilBrowserReady = async(browser)=>{
	await browser.waitUntil(
		async function() {
			const state = await browser.execute(function() {
				return document.readyState;
			});

			return state === 'complete';
		},
		{
			timeout: 60000, //60secs
			timeoutMsg: 'Oops! Check your internet connection'
		}
	);
};

const getBrowserInnerSizes = async(browser) => {
	return await browser.executeAsync(async(done) => {
		const y = window.innerHeight;
		const x = window.innerWidth;

		done({ x, y });
	});
};

//user to tap screen to fake user initial interaction
const tapBrowser = async(browser)=>{
	browser.touchAction({
		action: 'tap',
		x: 150,
		y: 150
	});
};

const initialUserInteraction = async(browser)=>{
	tapBrowser(browser);

	await scrollToAbsolutePosition(browser, 0);

	await scrollTo(browser, 5, 1);

	await scrollTo(browser, 0, 1);
};

module.exports = {
	waitUntilBrowserReady,
	tapBrowser,
	getBrowserInnerSizes,
	initialUserInteraction
};
