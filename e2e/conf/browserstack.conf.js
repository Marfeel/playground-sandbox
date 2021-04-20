/* eslint-disable camelcase */
const { buildConfiguration } = require('./configurationBuilder');

const capabilities = [
	{
		platformName: 'iOS',
		automationName: 'XCUITest',
		deviceName: 'iPhone 11',
		platformVersion: '14',
		browserName: 'Safari'
	}];

const specs = [
	// './experiences/branded-content/branded-content-card.test.js',
	// './experiences/comments/comments.test.js',
	// './experiences/facebook/facebook.test.js',
	// './experiences/featured_article/featured_article.test.js',
	// './experiences/homepage/homepage.test.js',
	'./experiences/multicard/multicard.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
