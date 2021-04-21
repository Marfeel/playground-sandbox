

const { baseConfig, localProperties, bsProperties, bsLocalProperties } = require('./defaultConfigurations');

const bsCapabilitiesProps = {
	'idleTimeout': 300,
	'browserstack.console': 'info',
	'browserstack.networkLogs': true,
	'browserstack.acceptInsecureCerts': true,
	'browserstack.idleTimeout': '300'
};

const bsLocalCapabilitiesProps = {
	'browserstack.local': true,
	'acceptSslCerts': 'true',
	'acceptSsl': 'true'
};

const buildConfiguration = (E2E_MODE, capabilities, specs) => {
	let configuration,
		completeCapabilities = capabilities;

	if (E2E_MODE==='local') {
		configuration = { ...baseConfig, ...localProperties };
	}

	if (E2E_MODE==='browserstack') {
		configuration = { ...baseConfig, ...bsProperties };
		completeCapabilities = completeCapabilities.map((capability)=>{
			return { ...capability, ...bsCapabilitiesProps };
		});
	}

	if (E2E_MODE==='browserstack-local') {
		configuration = { ...baseConfig, ...bsProperties, ...bsLocalProperties };
		completeCapabilities = completeCapabilities.map((capability)=>{
			return { ...capability, ...bsCapabilitiesProps, ...bsLocalCapabilitiesProps };
		});
	}

	configuration.specs = specs;
	configuration.capabilities = completeCapabilities;

	return configuration;
};

module.exports = {
	buildConfiguration
};

