require('dotenv').config();

const user = process.env.BROWSERSTACK_USERNAME || '';
const key = process.env.BROWSERSTACK_ACCESS_KEY || '';

exports.config = {
	user,
  key,

  updateJob: false,
  specs: [
    './experiences/homepage/homepage.test.js',
  ],
  exclude: [],

  capabilities: [{
    platformName: 'iOS',
    automationName: 'XCUITest',
    deviceName: 'iPhone 11',
    platformVersion: '14',
    browserName: 'Safari',
    'browserstack.console': "info",
    'browserstack.networkLogs':true,
    'browserstack.acceptInsecureCerts': true
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: "/wd/hub",
  host: 'hub.browserstack.com',

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    bail: true
  },

  // Code to mark the status of test on BrowserStack based on the assertion status
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  }
}
