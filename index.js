const axios = require('axios');
const debug = require('debug')('config-req:request');


const formatURLPattern = require('./lib/formatURLPattern');

const createInstance = (options = {}) => axios.create({
  timeout: 10000,
  ...options,
});


const requestMap = (instance, config) => Object.keys(config)
  .reduce((acum, configKey) => ({
    ...acum,
    [configKey]: !config[configKey].url
      ? requestMap(instance, config[configKey])
      : ({ body, headers = {}, params = {}, ...req } = {}) => {
        let instanceParams = {
          body,
          headers,
          params,
          query: req.query,
          ...req,
        };
        return instance.request({
          ...config[configKey],
          url: formatURLPattern(config[configKey].url, instanceParams.params),
          method: config[configKey].method,
          headers: instanceParams.headers,
          data: instanceParams.body,
          params: instanceParams.query,
          ...(instanceParams.auth ? { auth: instanceParams.auth } : {}),
        });
      },
  }), {});

const options = (routesConfig, instanceConfig) => {
  debug('CREATING INSTANCE USING CONFIG', routesConfig);
  const instance = createInstance(instanceConfig);
  debug('INSTANCE REQUEST CONFIG', instanceConfig);
  return requestMap(instance, routesConfig);
};

module.exports = options;
