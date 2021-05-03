const { buildConfiguration } = require('./configurationBuilder');

const capabilities = [
	{
		platformName: 'iOS',
		automationName: 'XCUITest',
		deviceName: 'iPhone 8 Plus',
		platformVersion: '14.4',
		browserName: 'Safari'
	}
];

const specs = [
	'./experiences/branded-content/branded-content-card.test.js'
	// './experiences/comments/comments.test.js'
	// './experiences/facebook/facebook.test.js'
	// './experiences/paywall/paywall.test.js'
	// './experiences/featured_article/featured-article.test.js'
	// './experiences/homepage/homepage.test.js'
	// './experiences/multicard/multicard.test.js'
	// './experiences/newsletter/newsletter.test.js'
	// './experiences/podcast/podcast.test.js'
	// './experiences/push_notifications/push-notifications.test.js'
	// './experiences/taboola/taboola.test.js'
	// './experiences/top_articles/top-articles.test.js'
	// './e2e/experiences.test.js'
	// './e2e/relevant-experiences.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
