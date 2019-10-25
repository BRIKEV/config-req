const axios = require('axios');
const debug = require('debug')('config-req:request');

const formatURLPattern = require('./lib/formatURLPattern');

const createInstance = (options = {}) => axios.create({
  ...options,
  timeout: 10000,
});

const requestMap = (instance, config) => Object.keys(config)
  .reduce((acum, configKey) => ({
    ...acum,
    [configKey]: !config[configKey].url
      ? requestMap(instance, config[configKey])
      : ({ body, headers = {}, params = {}, urlParams = {} } = {}) => instance.request({
        ...config[configKey],
        url: formatURLPattern(config[configKey].url, urlParams),
        method: config[configKey].method,
        headers,
        data: body,
        params,
      }),
  }), {});

const options = (routesConfig, instanceConfig) => {
  debug('CREATING INSTANCE USING CONFIG', routesConfig);
  const instance = createInstance(instanceConfig);
  debug('INSTANCE REQUEST CONFIG', instanceConfig);
  return requestMap(instance, routesConfig);
};

module.exports = options;
