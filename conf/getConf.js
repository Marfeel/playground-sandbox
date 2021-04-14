const { config: defaultBrowserStackConf } = require('./browserstack.conf')
const { config: defaultBrowserStackLocalConf } = require('./browserstack.local.conf')
const { config: defaultLocalConf } = require('./local.conf')

exports.getConf = (customConf) => {
	const E2E_MODE = process.env.E2E_MODE;
	console.log(E2E_MODE)
	switch (E2E_MODE) {
		case 'browserstack':
			return customConf || defaultBrowserStackConf;
		case 'browserstack-local':
			return customConf || defaultBrowserStackLocalConf;
		case 'local':
			return customConf || defaultLocalConf;
		default:
			throw new Error(`End to End mode ${E2E_MODE} does not exist`)
	}
}