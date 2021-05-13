/* eslint-disable no-console */

const { range } = require('mathjs');
const { isWebVersion } = require('./technology');

const getHandlerSelector = (cardSelector)=>{
	return isWebVersion()
		? `${cardSelector} [data-testid=cardDragTarget]`
		: `${cardSelector} #mrf-flowcards-drag-handler`;
};

const getTargetPosition = async(browser, handlerSelector)=>{
	const startPosition = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const dragHandler = document.querySelector(cardSelectorBrowser);
		const { y } = dragHandler.getBoundingClientRect();

		done(y);
	}, handlerSelector);

	return startPosition;
};

const executeTouch = async(browser, handlerSelector, y, type)=>{
	await browser.executeAsync(async(handlerSelectorBrowser, yBrowser, typeBrowser, done) => {
		const createTouch = (target, clientY, clientX = 200) => {
			return new Touch({
				identifier: 1,
				target,
				clientY,
				clientX,
				radiusX: 2.5,
				radiusY: 2.5,
				rotationAngle: 10,
				force: 0.5
			});
		};

		const dragHandler = document.querySelector(handlerSelectorBrowser);
		const touchStart = createTouch(dragHandler, yBrowser, 200);
		const touchStartEvent = new TouchEvent(typeBrowser, { bubbles: true, touches: [touchStart] });

		dragHandler.dispatchEvent(touchStartEvent);

		done();
	}, handlerSelector, y, type);
};


const dragCardTo = async(browser, cardSelector, to)=>{
	const handlerSelector = getHandlerSelector(cardSelector);
	const from = await getTargetPosition(browser, handlerSelector);
	const movements = range(from, to, 50, true)._data;

	await executeTouch(browser, handlerSelector, from, 'touchstart');
	await movements.reduce((prev, value)=>{
		return prev.then(()=>{
			executeTouch(browser, handlerSelector, value, 'touchmove');

			return new Promise(resolve => setTimeout(resolve, 100));
		});
	}, Promise.resolve());
	await executeTouch(browser, handlerSelector, to, 'touchend');
};

const dragCardBy = async(browser, cardSelector, dragByY)=>{
	const handlerSelector = getHandlerSelector(cardSelector);
	const currentYPosition = await browser.executeAsync(async(handlerSelectorBrowser, done) => {
		const dragHandler = document.querySelector(handlerSelectorBrowser);
		const { y } = dragHandler.getBoundingClientRect();

		done(y);
	}, handlerSelector);

	const wantedYPosition = currentYPosition+dragByY;

	console.log(`wantedYPosition: ${wantedYPosition}`);

	await dragCardTo(browser, cardSelector, wantedYPosition);
};

const touchCard = async(browser, cardSelector)=>{
	await browser.execute(async(handlerSelectorBrowser) => {
		const createTouch = (target, clientY, clientX = 200) => {
			return new Touch({
				identifier: 123,
				target,
				clientY,
				clientX,
				radiusX: 2.5,
				radiusY: 2.5,
				rotationAngle: 10,
				force: 0.5
			});
		};

		const touch = async(el, y1) => {
			const touchStart = createTouch(el, y1);
			const touchEnd = createTouch(el, y1);

			const touchStartEvent = new TouchEvent('touchstart', { bubbles: true, touches: [touchStart] });
			const touchEndEvent = new TouchEvent('touchend', { bubbles: true, touches: [touchEnd] });

			await el.dispatchEvent(touchStartEvent);
			await el.dispatchEvent(touchEndEvent);
		};

		const touchCardAt = async(el) => {
			const { y } = await el.getBoundingClientRect();

			await touch(el, y + 15);
		};

		const dragHandler = document.querySelector(handlerSelectorBrowser);

		await touchCardAt(dragHandler);
	}, getHandlerSelector(cardSelector));
};

module.exports = {
	dragCardTo,
	dragCardBy,
	touchCard
};
