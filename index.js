const axios = require('axios');
const debug = require('debug')('config-req:request');

const formatURLPattern = require('./lib/formatURLPattern');
const validRequest = require('./lib/validRequest');

const createInstance = (options = {}) => axios.create({
  ...options,
  timeout: 10000,
});

const VALID_REQUEST_OPTIONS = ['body', 'params', 'query', 'headers'];

const requestMap = (instance, config) => Object.keys(config)
  .reduce((acum, configKey) => ({
    ...acum,
    [configKey]: !config[configKey].url
      ? requestMap(instance, config[configKey])
      : ({ body, headers = {}, params = {}, urlParams = {}, ...req } = {}) => {
        let instanceParams = {
          body,
          headers,
          params,
          query: urlParams,
        };
        if (validRequest(req, VALID_REQUEST_OPTIONS)) {
          instanceParams = {
            ...instanceParams,
            ...req,
          };
        } else {
          console.log('You provide an incomplete request object');
          console.log(`Your request object keys: ${Object.keys(req).join(',')}`);
          console.log(`Required object keys: ${Object.keys(VALID_REQUEST_OPTIONS).join(',')}`);
        }
        return instance.request({
          ...config[configKey],
          url: formatURLPattern(config[configKey].url, instanceParams.query),
          method: config[configKey].method,
          headers: instanceParams.headers,
          data: instanceParams.body,
          params: instanceParams.params,
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
