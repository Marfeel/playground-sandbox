const { expect } = require('chai');
const experience = require('./podcast.json');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');

const { test, doers, checkers } = require('../../e2e/tests');

const customCheckers = {
	playerIsPaused: (element) => {
		return async (card) => {
			const result = await browser.executeAsync(async(args, done) => {
				const cardDocument = document
					.querySelector(`${args.cardSelector} article [data-testid="amp-document-single"]`);
				const playButton = cardDocument.shadowRoot.querySelector(args.element);
				const checked = playButton.checked;

				done(checked);
			}, { cardSelector: card.cardSelector, element });

			expect(result).equal(true);
		}
	}
};

const suite = function() {
	const fixture = {
		articleTitle: 'Article example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/article-example.html',
			technology: 'web',
			experienceUrl: '/experiences/podcast/podcast.json'
		})
	};

	test.with(experience)
		.bootstrap(fixture)
		.for('podcast')
		.test('card should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card should have right content', checkers.cardHasProperContent())
		.test('card should be displayed in viewport at initial snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should not change snap point when the user taps it', doers.touchCard(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should snap to active position when dragged up', doers.dragToSnapPoint('active'), checkers.cardIsAtSnapPoint('active'))
		.test('card should be closed by tapping the close button', doers.scrollViewport(0.5), doers.touchCloseButton(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should snap to minimised position when dragged down', doers.dragToSnapPoint('minimised'), checkers.cardIsAtSnapPoint('minimised'))
		.test('card should let the user interact with the content', doers.touchElementInsideCard('#mrf-icon-play'), customCheckers.playerIsPaused('#mrf-icon-play'))
};

describe('Podcast experience', suite);

module.exports = suite;