const { config: browserStackRemoteConf } = require('./browserstack.remote.conf')
const { config: browserStackLocalConf } = require('./browserstack.local.conf')
const { config: localConf } = require('./local.conf')

exports.getConf = () => {
	const endToEndMode = process.env.END_TO_END_MODE;
	console.log(endToEndMode)
	switch (endToEndMode) {
		case 'browserstack-remote':
			return browserStackRemoteConf;
		case 'browserstack-local':
			return browserStackLocalConf;
		case 'local':
			return localConf;
		default:
			throw new Error(`End to End mode ${endToEndMode} does not exist`)
	}
}