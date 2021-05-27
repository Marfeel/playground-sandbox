
const getArticleStyles = async(browser, selector)=>{
	const articleStyles = await browser.executeAsync(async(id, done) => {
		const article = document.querySelector(id);
		const style = article.getAttribute('style');

		done(style);
	}, selector);

	return articleStyles;
};

const getContentLockerStyles = async(browser, selector)=>{
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
	}, selector, CARD_POSITIONER_TEST_ID);

	return cardPositionerStyle;
};

const isContentLocker = async(browser, selector, iterationClosure) => {
  console.log('selector: ', selector);
	let articleStyles,
    contentLockerStyles
		isGated = false;

	await browser.waitUntil(async()=>{
		articleStyles = await getArticleStyles(browser, selector);
    contentLockerStyles = await getContentLockerStyles(browser, selector);

		articleStyles.includes('overflow: hidden') && 
    articleStyles.includes('position: relative');
    console.log('articleStyles: ', articleStyles);
    console.log('contentLockerStyles: ', contentLockerStyles);

		if (!!iterationClosure) {
			await iterationClosure();
		}

		return isGated;
	}, {
		timeout: 20000,
		interval: 1000,
		timeoutMsg: 'Card positioner is not sticky'
	});

	return isGated;
};

module.exports = {
	isContentLocker
};
