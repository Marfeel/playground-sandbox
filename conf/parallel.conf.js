require('dotenv').config();

const user = process.env.BROWSERSTACK_USERNAME || '';
const key = process.env.BROWSERSTACK_ACCESS_KEY || '';

exports.config = {
  user,
  key,

  updateJob: false,
  specs: [
    './tests/specs/multicard.test.js'
  ],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    name: 'parallel_test',
    build: 'browserstack-build-1'
  },

  capabilities: [
    {
      platformName: 'iOS',
      automationName: 'XCUITest',
      deviceName: 'iPhone 12 Pro Max',
      platformVersion: '14',
      browserName: 'Safari'
    },
    {
      device: 'Google Pixel 5',
      browserName: 'Android',
      os_version: '11.0',
      real_mobile: 'true'
    }
  ],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd'
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

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});