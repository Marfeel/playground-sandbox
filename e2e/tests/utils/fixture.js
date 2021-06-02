const getUrlFixture = ({
	siteUrl,
	technology,
	experienceUrl
}) => {
	const params = [];

	siteUrl && params.push(`siteUrl=${siteUrl}`);
	technology && params.push(`technology=${technology}`);
	experienceUrl && params.push(`experienceUrl=${experienceUrl}`);

	const requestHostname = process.env.STATICS_HOSTNAME || 'playground.marfeel.com';
	params.push(`requestHostname=${requestHostname}`);

	if (process.env.E2E_MODE === 'browserstack-local') {
		params.push('flowcardsHostname=https://bs-local.com');
	} else if (process.env.E2E_MODE === 'browserstack-pr' || process.env.E2E_MODE === 'local-pr') {
		params.push(`flowcardsHostname=https://flowcards-e2e.mrf.io/statics/${process.env.PR_ID}`);
	} else if (process.env.STATICS_HOSTNAME) {
		params.push(`flowcardsHostname=https://${process.env.STATICS_HOSTNAME}`);
	}

	const url = `https://playground.mrf.io/simulate?${params.join('&')}`;

	// eslint-disable-next-line no-console
	console.log('FixtureUrl:', url);

	return url;
};

module.exports = {
	getUrlFixture
};
