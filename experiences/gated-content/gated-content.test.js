const experience = require('./gated-content.json');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');

const { test, doers, checkers } = require('../../e2e/tests');

const suite = function() {
	const fixture = {
		articleTitle: 'Article example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
			technology: 'web',
			experienceUrl: '/experiences/gated-content/gated-content.json'
		})
	};

	test.with(experience)
		.bootstrap(fixture)
		.for('gated')
		.test('card should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card should have right content', checkers.cardHasProperContent())
		.test('card should be displayed in viewport at active snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('active'))
};

describe('Gated content experience', suite);

exports.default = suite;
