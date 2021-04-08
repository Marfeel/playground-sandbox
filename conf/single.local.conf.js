exports.config = {
  updateJob: false,
  specs: [
    './tests/specs/homepage.test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: "iOS",
		automationName: "XCUITest",
		deviceName: "iPhone 8 Plus",
		platformVersion: "14.4",
		browserName: "Safari"
  }],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: "/wd/hub",
	host: "localhost",
	port: 4723,
	logLevel: "info",

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    console.log('Error:', error);
    console.log('result:', result);
    console.log('duration:', duration);
    console.log('passed:', passed);
    console.log('retries:', retries);
  }
}
