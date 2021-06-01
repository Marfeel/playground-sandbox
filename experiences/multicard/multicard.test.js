const experience = require('./multicard.json');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');

const { test, doers, checkers } = require('../../e2e/tests');

const suite = function() {
	const fixture = {
		articleTitle: 'Article example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
			technology: 'web',
			experienceUrl: '/experiences/multicard/multicard.json'
		})
	};

	test.with(experience)
		.bootstrap(fixture)
		.for('homepage')
		.test('card 1 should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card 1 should have right content', checkers.cardHasProperContent())
		.test('card 1 should be displayed in viewport at initial snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('initial'))
		.test('card 1 should activate on tap', doers.touchCard(), checkers.cardIsAtSnapPoint('active'))
		.test('card 1 should snap to initial position when dragged down', doers.dragToSnapPoint('initial'), checkers.cardIsAtSnapPoint('initial'))
		.for('nextArticle')
		.test('card 2 should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card 2 should have right content', checkers.cardHasProperContent())
		.test('card 2 should be displayed in viewport at initial snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('initial'))
		.test('card 2 should activate on tap', doers.touchCard(), checkers.cardIsAtSnapPoint('active'))
		.test('card 2 should be removed if dragged down outside of viewport', doers.dragToSnapPoint('hidden'), checkers.cardIsAtSnapPoint('hidden'))
};

describe('Multicards experience', suite);

exports.default = suite;
