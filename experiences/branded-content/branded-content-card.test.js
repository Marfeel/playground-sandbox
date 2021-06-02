const { expect } = require('chai');
const {
	croupier: { fetchFlowcardsJson }, 
	fixture: { getUrlFixture }
} = require('../../e2e/tests/utils');

const experience = require('./branded-content-card.json');
const { test, doers, checkers } = require('../../e2e/tests');

const customCheckers = {
	croupierMatches: () => {
		return async () => {
			const dynamic_flowcards = JSON.stringify({
				name: 'BrandedContentFlowcard',
				relevance: 100,
				url: 'https://playground.marfeel.com/experiences/branded-content/branded-content-card.html',
				renderProps: JSON.stringify(experience.cards.BrandedContentFlowcard)
			});

			const croupier = await fetchFlowcardsJson({}, `https://flowcards.mrf.io/json/web?site_id=120&client_id=fec803ab-7426-4617-ab35-806db795b85c&canonical_url=https%3A%2F%2Fplayground.mrf.io%2Fsimulate%3FsiteUrl%3Dhttps%253A%252F%252Fplayground.marfeel.com%252Ftemplates%252Fbranded-content-article.html%26requestHostname%3Dplayground.marfeel.com%26experienceUrl%3Dcroupier&referrer=https%3A%2F%2Fplayground.marfeel.com&geo=__INJECT_GEO__&dynamic_flowcards=${encodeURIComponent(dynamic_flowcards)}`);

			expect(croupier.cards.BrandedContentFlowcard.content.url).equal('https://flowcards.mrf.io/transformer/playground.marfeel.com?url=https%3A%2F%2Fplayground.marfeel%2Fexperiences%2Fbranded-content%2Fbranded-content-article.html&vars=currentUrl,https%3A%2F%2Fplayground.mrf.io%2Fsimulate%3FsiteUrl%3Dhttps%253A%252F%252Fplayground.marfeel.com%252Ftemplates%252Fbranded-content-article.html%26requestHostname%3Dplayground.marfeel.com%26experienceUrl%3Dcroupier,technology,0,flowcardId,FC_DC_UNKNOWN');
		}
	}
}

const suite = async function() {
	const fixture = {
		articleTitle: 'Branded Content example',
		url: getUrlFixture({
			siteUrl: 'https://playground.marfeel.com/templates/branded-content-article.html',
			experienceUrl: 'croupier'
		})
	};

	test.with(experience)
		.test('croupier response matches the expected card', customCheckers.croupierMatches())
		.bootstrap(fixture)
		.for('BrandedContentFlowcard')
		.test('card should render on scroll', doers.scrollToTrigger('myScrollTrigger'), checkers.cardExists())
		.test('card should have right content', checkers.cardHasProperContent())
		.test('card should be displayed in viewport at initial snap point', doers.scrollViewport(), checkers.cardIsInViewport(), checkers.cardIsAtSnapPoint('initial'))
		.test('card should activate on tap', doers.touchCard(), checkers.cardIsAtSnapPoint('active'))
		.test('card should be closed by tapping the close button', doers.scrollViewport(0.5), doers.touchCloseButton(), checkers.cardIsAtSnapPoint('initial'))
};

describe('Branded content experience', suite);

exports.default = suite;
