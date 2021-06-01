const fetch = require('node-fetch');

const BASE_URL = 'https://flowcards.mrf.io/json/web';

const fetchFlowcardsJson = async({
	siteId,
	clientId,
	canonicalUrl
}, overwriteUrl) => {
	const url = overwriteUrl || `${BASE_URL}?site_id=${siteId}&client_id=${clientId}&canonical_url=${canonicalUrl}`;
	const response = await fetch(url).then(res => res.json());

	return response;
};

module.exports = {
	fetchFlowcardsJson
};
