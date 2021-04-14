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
	'./experiences/homepage/homepage.test.js'
];

const config = buildConfiguration(process.env.E2E_MODE, capabilities, specs);

exports.config = config;
