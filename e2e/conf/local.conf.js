const { buildConfiguration } = require('./configurationBuilder');

const capabilities = [{
	platformName: 'iOS',
	automationName: 'XCUITest',
	deviceName: 'iPhone 8 Plus',
	platformVersion: '14.4',
	browserName: 'Safari'
}];

const specs = [
	'./experiences/homepage/homepage.test.js'
	// './experiences/featured_article/featured_article.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
