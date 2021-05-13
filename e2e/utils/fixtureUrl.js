
const fs = require('fs');

const { isAmpVersion } = require('./technology');

const getUrlFixture = ({
	siteUrl,
	requestHostname,
	technology,
	experienceUrl
}, overwriteUrl) => {
	let url = overwriteUrl;

	if (!overwriteUrl) {
	// eslint-disable-next-line max-len
		url = `https://playground.mrf.io/simulate?siteUrl=${siteUrl}&requestHostname=${requestHostname}&technology=${technology}&experienceUrl=${experienceUrl}`;
	}

	if (process.env.E2E_MODE === 'browserstack-local') {
		url += '&flowcardsHostname=https://bs-local.com';

		if (isAmpVersion) {
			const hash = fs.readFileSync(`${process.env.CSP_HASH}/csp-hash.txt`, 'utf8');

			url += `&cspHash=${hash}`;
		}
	}

	// eslint-disable-next-line no-console
	console.log('FixtureUrl:', url);

	return url;
};


module.exports = {
	getUrlFixture
};
