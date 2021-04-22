/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable global-require */
require('dotenv').config();
const browserstack = require('browserstack-local');

const user = process.env.BROWSERSTACK_USERNAME || '';
const key = process.env.BROWSERSTACK_ACCESS_KEY || '';

const baseConfig = {
	specs: [],
	capabilities: [],

	logLevel: 'warn',
	coloredLogs: true,
	screenshotPath: './errorShots/',
	baseUrl: '',
	waitforTimeout: 10000,
	connectionRetryTimeout: 300000,
	connectionRetryCount: 3,

	before: function() {
		const chai = require('chai');

		global.expect = chai.expect;
		chai.Should();
	},
	framework: 'mocha',
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
		bail: true
	}
};

const localProperties = {
	path: '/wd/hub',
	host: 'localhost',
	port: 4723,
	afterTest: function(test, context, { error, result, duration, passed, retries }) {
		console.log('Error:', error);
		console.log('result:', result);
		console.log('duration:', duration);
		console.log('passed:', passed);
		console.log('retries:', retries);
	}
};

const bsProperties = {
	user,
	key,
	updateJob: false,
	host: 'hub.browserstack.com',
	afterTest: function(test, context, { error, result, duration, passed, retries }) {
		if (passed) {
			// eslint-disable-next-line max-len
			browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
		} else {
			// eslint-disable-next-line max-len
			browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
		}
	}
};

const bsLocalProperties = {
	onPrepare: function(config, capabilities) {
		console.log('Connecting local');

		return new Promise(function(resolve, reject) {
			exports.bs_local = new browserstack.Local();
			exports.bs_local.start({ key: key }, function(error) {
				if (error) { return reject(error); }
				console.log('Connected. Now testing...');

				return resolve();
			});
		});
	},

	onComplete: function(capabilties, specs) {
		return new Promise(function(resolve, reject) {
			exports.bs_local.stop(function() {
				console.log('Binary stopped');
				resolve();
			});
		});
	}
};

module.exports = {
	baseConfig,
	localProperties,
	bsProperties,
	bsLocalProperties
};
