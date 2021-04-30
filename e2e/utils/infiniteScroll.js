/* eslint-disable no-console */
const { scrollTo } = require('./scroll');

const CARD_POSITIONER_TEST_ID = 'card-positioner';

const triggerInfiniteScroll = async(browser)=>{
	const height = await browser.executeAsync(async(args, done) => {
		const bodyHeight = document.body.scrollHeight;

		done(bodyHeight);
	}, '');

	await scrollTo(browser, height, 300);
};

const getCardPositionerStyles = async(browser, cardSelector)=>{
	const cardPositionerStyle = await browser.executeAsync(async(id, cardPositionerTestId, done) => {
		const getCardPositioner = (el) => {
			const parentEl = el.parentElement;

			if (parentEl.getAttribute('data-testid') !== cardPositionerTestId) {
				return getCardPositioner(parentEl);
			}

			return parentEl;
		};
		const card = document.querySelector(id);
		const cardPositioner = getCardPositioner(card);

		const style = cardPositioner.getAttribute('style');

		done(style);
	}, cardSelector, CARD_POSITIONER_TEST_ID);

	return cardPositionerStyle;
};

const isAttachedToEndOfPage = async(browser, cardSelector, iterationClosure) => {
	let cardPositionerStyle,
		isSticky = false;

	await browser.waitUntil(async()=>{
		cardPositionerStyle = await getCardPositionerStyles(browser, cardSelector);
		isSticky = cardPositionerStyle.includes('position: sticky');

		if (!!iterationClosure) {
			await iterationClosure();
		}

		return isSticky;
	}, {
		timeout: 5000,
		interval: 500,
		timeoutMsg: 'Card positioner is not sticky'
	});

	return isSticky;
};

module.exports = {
	triggerInfiniteScroll,
	isAttachedToEndOfPage
};
