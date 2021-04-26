const fetch = require('node-fetch');

const BASE_URL = 'https://flowcards.mrf.io/json/web';

const getFlowcardJson = async({
	siteId,
	clientId,
	canonicalUrl
}, overwriteUrl) => {
	let url = `${BASE_URL}?site_id=${siteId}&client_id=${clientId}&canonical_url=${canonicalUrl}`;

	if (overwriteUrl) {
		// eslint-disable-next-line max-len
		url = overwriteUrl;
	}
	const response = await fetch(url).then(res=>res.json());

	return response;
};


module.exports = {
	getFlowcardJson
};
