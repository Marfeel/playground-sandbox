const browserStackRemoteConf = require('./browserstack.remote.conf')
const browserStackLocalConf = require('./browserstack.local.conf')
const localConf = require('./local.conf')

exports.getConf = () => {
	const endToEndMode = process.env.END_TO_END_MODE;
	switch (endToEndMode) {
		case 'browserstack-remote':
			return browserStackRemoteConf;
		case 'browserstack-local':
			return browserStackLocalConf;
		case 'local':
			console.log(process.cwd())
			console.log(__dirname)
			console.log(localConf)
			return localConf;
		default:
			throw new Error(`End to End mode ${endToEndMode} does not exist`)
	}
}