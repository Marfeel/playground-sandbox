
const getCurrentScrollPosition = async(browser)=>{
	return await browser.executeAsync(async(arg, done) => {
		const htmlEl = document.querySelector('html');

		done(htmlEl.scrollTop);
	}, '');
};

const range = (to, from = 0, step = 1) => Array.from(
	{ length: Math.ceil(to / step) },
	(_, k) => from + (k * 50)
);

const scroll = async(browser, y) => {
	return await browser.executeAsync(async(yBrowser, done) => {
		const html = document.querySelector('html');

		html.scroll(0, yBrowser);
		html.dispatchEvent(new CustomEvent('scroll', {}));
		done(html.scrollLeft === 0 && html.scrollTop === yBrowser);
	}, y);
};

const scrollTo = async(browser, y)=>{
	const currentScrollPosition = await getCurrentScrollPosition(browser);
	const scrollArray = range(y, currentScrollPosition, 50);

	await scrollArray.reduce(
		async(acc, cur) => await acc.then(() => scroll(browser, cur)),
		Promise.resolve()
	);
};

module.exports = {
	scrollTo
};
