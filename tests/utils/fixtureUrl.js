module.exports.getUrlFixture = ({
	siteUrl,
	requestHostname,
	technology,
	experienceUrl
}) => {
	let url = `https://playground.mrf.io/simulate?siteUrl=${siteUrl}&requestHostname=${requestHostname}&technology=${technology}&experienceUrl=${experienceUrl}`;

	if (process.env.NODE_ENV === 'production') {
		url += '&flowcardsHostname=https://bs-local.com';
	}

	return url;
}