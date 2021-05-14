/* eslint-disable no-console */

const { range } = require('mathjs');

const getTargetPosition = async(browser, cardSelector)=>{
	const startPosition = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const dragHandler = document.querySelector(`${cardSelectorBrowser}`);
		const { y } = dragHandler.getBoundingClientRect();

		done(y);
	}, cardSelector);

	return startPosition;
};

const executeTouch = async(browser, cardSelector, y, type)=>{
	await browser.executeAsync(async(cardSelectorBrowser, yBrowser, typeBrowser, done) => {
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

		const dragHandler = document.querySelector(`${cardSelectorBrowser}`);
		const touchStart = createTouch(dragHandler, yBrowser, 200);
		const touchStartEvent = new TouchEvent(typeBrowser, { bubbles: true, touches: [touchStart] });

		dragHandler.dispatchEvent(touchStartEvent);

		done();
	}, cardSelector, y, type);
};


const dragCardTo = async(browser, cardSelector, to)=>{
	const from = await getTargetPosition(browser, cardSelector);
	const movements = range(from, to, 50, true)._data;

	await executeTouch(browser, cardSelector, from, 'touchstart');
	await movements.reduce((prev, value)=>{
		return prev.then(()=>{
			executeTouch(browser, cardSelector, value, 'touchmove');

			return new Promise(resolve => setTimeout(resolve, 100));
		});
	}, Promise.resolve());
	await executeTouch(browser, cardSelector, to, 'touchend');
};

const dragCardBy = async(browser, cardSelector, dragByY)=>{
	const currentYPosition = await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const dragHandler = document.querySelector(`${cardSelectorBrowser}`);
		const { y } = dragHandler.getBoundingClientRect();

		done(y);
	}, cardSelector);

	const wantedYPosition = currentYPosition+dragByY;

	console.log(`wantedYPosition: ${wantedYPosition}`);

	await dragCardTo(browser, cardSelector, wantedYPosition);
};

const touchCard = async(browser, cardSelector)=>{
	await browser.execute(async(cardSelectorBrowser) => {
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

		const dragHandler = document.querySelector(`${cardSelectorBrowser}`);

		await touchCardAt(dragHandler);
	}, cardSelector);
};

const touchElementInsideCard = async(browser, cardSelector, childElementSelector)=>{
	await browser.execute(async(cardSelectorBrowser, childElementSelectorBrowser) => {
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

		const touch = async(el, y1, x1) => {
			const touchStart = createTouch(el, y1, x1);
			const touchEnd = createTouch(el, y1, x1);

			const touchStartEvent = new TouchEvent('touchstart', { bubbles: true, touches: [touchStart] });
			const touchEndEvent = new TouchEvent('touchend', { bubbles: true, touches: [touchEnd] });

			await el.dispatchEvent(touchStartEvent);
			await el.dispatchEvent(touchEndEvent);
		};

		const touchElementAt = async(el) => {
			const { y, x } = await el.getBoundingClientRect();

			await touch(el, y + 5, x + 5);
		};

		const cardDocument = document
			.querySelector(`${cardSelectorBrowser} article [data-testid="amp-document-single"]`);
		const element = cardDocument.shadowRoot.querySelector(childElementSelectorBrowser);

		await touchElementAt(element);
	}, cardSelector, childElementSelector);
};

module.exports = {
	dragCardTo,
	dragCardBy,
	touchCard,
	touchElementInsideCard
};
