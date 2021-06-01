const experience = require('./top_articles.json');
const { fixture: { getUrlFixture } } = require('../../e2e/tests/utils');

const { test, doers, checkers } = require('../../e2e/tests');

const suite = function() {
	const fixture = {
		articleTitle: 'Article example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
			technology: 'web',
			experienceUrl: '/experiences/top_articles/top_articles.json'
		})
	};

	test.with(experience)
		.bootstrap(fixture)
		.for('topArticles')
		.test('card should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card should have right content', checkers.cardHasProperContent())
		.test('card should be displayed in viewport at initial snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should activate on tap', doers.touchCard(), checkers.cardIsAtSnapPoint('active'))
		.test('card should be closed by tapping the close button', doers.scrollViewport(0.5), doers.touchCloseButton(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should snap to minimised position when dragged down', doers.dragToSnapPoint('minimised'), checkers.cardIsAtSnapPoint('minimised'))
		.test('card should attach to body on infinite scroll', doers.triggerInfiniteScroll(), checkers.cardIsAttachedToEndOfPage())
};

describe('Top articles experience', suite);

exports.default = suite;
