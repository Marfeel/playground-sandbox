/* eslint-disable camelcase */
const { buildConfiguration } = require('./configurationBuilder');

const capabilities = [
	{
		platformName: 'iOS',
		automationName: 'XCUITest',
		deviceName: 'iPhone 11',
		platformVersion: '14',
		browserName: 'Safari'
	},
	{
		os_version: '11.0',
		device: 'Google Pixel 5',
		browserName: 'Chrome'
	}];

const specs = [
	// './experiences/homepage/homepage.test.js'
	// './experiences/facebook/facebook.test.js'
	// './experiences/featured_article/featured-article.test.js'
	// './experiences/multicard/multicard.test.js'
	// './experiences/paywall/paywall.test.js'
	// './experiences/branded-content/branded-content-card.test.js'
	// './experiences/comments/comments.test.js'
	// './experiences/newsletter/newsletter.test.js'
	// './experiences/podcast/podcast.test.js'
	// './experiences/push_notifications/push-notifications.test.js'
	// './experiences/taboola/taboola.test.js'
	// './experiences/top_articles/top-articles.test.js'
	// './e2e/experiences.test.js'
	'./e2e/relevant-experiences.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
