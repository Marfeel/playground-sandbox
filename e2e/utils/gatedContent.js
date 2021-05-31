

const getArticleStyles = async(browser, selector)=>{
	const articleStyles = await browser.executeAsync(async(id, done) => {
		const article = document.querySelector(id);
		console.log('article: ', article);
		const style = article.getAttribute('style');
		console.log('style', style);
		done(style);
	}, selector);

	return articleStyles;
};


const isContentLocker = async(browser, selector, iterationClosure) => {
	let articleStyles
		isGated = false;

	await browser.waitUntil(async()=>{
		console.log('selector: ', selector);
		articleStyles = await getArticleStyles(browser, selector);
		console.log('articleStyles: ', articleStyles);
		
		isGated = articleStyles.includes('overflow: hidden') && 
			articleStyles.includes('position: relative');

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
