const experience = require('./newsletter.json');
const { fixture: { getUrlFixture } } = require('../../e2e/tests/utils');

const { test, doers, checkers } = require('../../e2e/tests');

const suite = function() {
	const fixture = {
		articleTitle: 'Article example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
			technology: 'web',
			experienceUrl: '/experiences/newsletter/newsletter.json'
		})
	};

	test.with(experience)
		.bootstrap(fixture)
		.for('newsletter')
		.test('card should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card should have right content', checkers.cardHasProperContent())
		.test('card should be displayed in viewport at active snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('active'))
		.test('card should be removed if dragged down outside of viewport', doers.dragToSnapPoint('hidden'), checkers.cardIsAtSnapPoint('hidden'))
};

describe('Newsletter experience', suite);

exports.default = suite;
