/* eslint-disable no-console */
const { range } = require('mathjs');

const getCurrentScrollPosition = async(browser)=>{
	return await browser.executeAsync(async(arg, done) => {
		const htmlEl = document.querySelector('html');

		done(htmlEl.scrollTop);
	}, '');
};

const scroll = async(browser, y) => {
	return await browser.executeAsync(async(yBrowser, done) => {
		const html = document.querySelector('html');

		html.scroll(0, yBrowser);
		html.dispatchEvent(new CustomEvent('scroll', {}));
		done(html.scrollLeft === 0 && html.scrollTop === yBrowser);
	}, y);
};

const scrollTo = async(browser, y, step=50, timeout=100)=>{
	let localStep = step;
	const currentScrollPosition = await getCurrentScrollPosition(browser);

	if (currentScrollPosition>y) {
		localStep = -step;
	}

	const scrollArray = range(currentScrollPosition, y, localStep, true)._data;

	await scrollArray.reduce((prev, value)=>{
		return prev.then(async()=>{
			await scroll(browser, value);

			return new Promise(resolve => setTimeout(resolve, timeout));
		});
	}, Promise.resolve());
};

const scrollByStep = async(browser, y, step, timeout) => {
	const currentScrollPosition = await getCurrentScrollPosition(browser);

	await scrollTo(browser, currentScrollPosition + y, step, timeout);
};

const scrollBy = async(browser, y)=>{
	return await browser.executeAsync(async(yBrowser, done) => {
		const html = document.querySelector('html');

		html.scrollBy(0, yBrowser);
		html.dispatchEvent(new CustomEvent('scroll', {}));
		done();
	}, y);
};

const scrollToElementStep = async(browser, selector) => {
	const currentScrollPosition = await getCurrentScrollPosition(browser);
	const elementPosition = await browser.executeAsync(async(selectorBrowser, done) => {
		const element = document.querySelector(selectorBrowser).getBoundingClientRect();

		done(element);
	}, selector);

	await scrollByStep(browser, elementPosition.y - currentScrollPosition + 100);
};

const scrollToElement = async(browser, selector)=>{
	return await browser.executeAsync(async(selectorBrowser, done) => {
		const element = document.querySelector(selectorBrowser);

		element.scrollIntoView();
		done();
	}, selector);
};

module.exports = {
	scrollTo,
	scrollBy,
	scrollByStep,
	scrollToElement,
	scrollToElementStep,
	scrollToAbsolutePosition: scroll
};
