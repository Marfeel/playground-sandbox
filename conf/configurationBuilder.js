

const { baseConfig, localProperties, bsProperties, bsLocalProperties } = require('./defaultConfigurations');

const bsCapabilitiesProps = {
  'browserstack.console': 'info',
  'browserstack.networkLogs': true,
  'browserstack.acceptInsecureCerts': true
}

const bsLocalCapabilitiesProps = {
  'browserstack.local': true
}

const buildConfiguration = (E2E_MODE, capabilities, specs) => {
  let configuration;

  if (E2E_MODE=='local'){
    configuration = {...baseConfig, ...localProperties};
  } 
  
  if (E2E_MODE=='browserstack') {
    configuration = {...baseConfig, ...bsProperties};
    capabilities = capabilities.map((capability)=>{
      return {...capability, ...bsCapabilitiesProps}
    })
  }
  
  if (E2E_MODE=='browserstack-local') {
    configuration = {...baseConfig, ...bsProperties, ...bsLocalProperties}
    capabilities = capabilities.map((capability)=>{
      return {...capability,  ...bsCapabilitiesProps, ...bsLocalCapabilitiesProps}
    })
  }

  configuration.specs = specs;
  configuration.capabilities = capabilities;

  return configuration;
}

module.exports = {
  buildConfiguration
}

