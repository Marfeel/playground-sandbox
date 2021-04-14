module.exports.getUrlFixture = ({
	siteUrl,
	requestHostname,
	technology,
	experienceUrl
}) => {
	let url = `https://playground.mrf.io/simulate?siteUrl=${siteUrl}&requestHostname=${requestHostname}&technology=${technology}&experienceUrl=${experienceUrl}`;

	if (process.env.E2E_MODE === 'browserstack-local') {
		url += '&flowcardsHostname=https://bs-local.com';
	}

	console.log('FixtureUrl:', url)
	
	return url;
}