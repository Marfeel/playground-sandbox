const { config: defaultBrowserStackConf } = require('./browserstack.conf')
const { config: defaultBrowserStackLocalConf } = require('./browserstack.local.conf')
const { config: defaultLocalConf } = require('./local.conf')

exports.getConf = ({
	customConf
}) => {
	const endToEndMode = process.env.END_TO_END_MODE;
	console.log(endToEndMode)
	switch (endToEndMode) {
		case 'browserstack':
			return customConf || defaultBrowserStackConf;
		case 'browserstack-local':
			return customConf || defaultBrowserStackLocalConf;
		case 'local':
			return customConf || defaultLocalConf;
		default:
			throw new Error(`End to End mode ${endToEndMode} does not exist`)
	}
}