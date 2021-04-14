const { buildConfiguration } = require('./configurationBuilder');

const capabilities = [{
	platformName: 'iOS',
	automationName: 'XCUITest',
	deviceName: 'iPhone 11',
	platformVersion: '14.4',
	browserName: 'Safari'
}];

const specs = [
	'./experiences/homepage/homepage.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
