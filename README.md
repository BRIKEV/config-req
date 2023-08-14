# config-req

![npm](https://img.shields.io/npm/v/config-req)
[![CircleCI](https://circleci.com/gh/BRIKEV/config-req/tree/master.svg?style=svg)](https://circleci.com/gh/BRIKEV/config-req/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinccbsg/config-req/badge.svg)](https://snyk.io/test/github/kevinccbsg/config-req) [![Greenkeeper badge](https://badges.greenkeeper.io/kevinccbsg/config-req.svg)](https://greenkeeper.io/)

Axios wrapper based on a config file

## How it works

This module allows to set up a programmatic HTTP client based on axios. To set it up, it just the url and the HTTP
method per environment to be setup ¡et voilà!, a new and shiny HTTP client is ready to be used.

Axios options can be found [here](https://axios-http.com/docs/instance);

### Install package

```
npm install config-req
```

### Basic Example

```js
const request = require('config-req');

// Your env configuration
const config = {
  activateAccount: {
    url: 'http://localhost:5000/v1/account/activate',
    method: 'post',
  },
};

const api = request(config);

console.log(api); // returns an object like this { activateAccount: <Promise> }

// Api instance contains a request with the method and URL already configured
api.activateAccount()
  .then(response => {
    console.log(response); // Axios response
  });

````

### Nesting Configuration Example

```js
const request = require('config-req');

// Your env configuration with nested objects
const nestedOptions = {
  registration: {
    activateAccount: {
      url: 'http://localhost:5000/v1/account/activate',
      method: 'post',
    },
  },
};

const api = request(nestedOptions);

console.log(api); // returns an object like this { registration: { activateAccount: <Promise> } }

// Api instance contains a request with the method and URL already configured
api.registration.activateAccount()
  .then(response => {
    console.log(response); // Axios response
  });

````

## Customizer request parameters

```js
const request = require('config-req');

const options = {
  advanced: {
    withBodyInfo: {
      url: 'http://localhost:5000/v1/account/activate',
      method: 'post',
    },
    withURLParams: {
      url: 'http://localhost:5000/v1/account/:id/activate',
      method: 'get',
    },
    withBasicAuth: { // This will affect each call to this endpoint
      url: 'http://localhost:5000/v1/account/:id/activate',
      method: 'get',
      auth: { password: 'pwd', username: 'nickname' },
    }
  },
};

const api = request(options);

api.advanced.withBodyInfo({
  body: { example: 'example' }, // this is how to send body params
  query: { example: 'example' }, // this is how to send query params
  headers: { Authorization: 'Bearer example' }, // this is how to send header params
})
  .then(response => {
    console.log(response); // Axios response
  });

// This is when we want to handle dynamic url params like this
// http://localhost:5000/v1/account/:id/activate
// To change that ID we need to setup the urlParams
api.advanced.withURLParams({
  body: { example: 'example' }, // this is how to send body params
  query: { example: 'example' }, // this is how to send query params
  headers: { Authorization: 'Bearer example' }, // this is how to send header params
  params: { id: 'urlParam' },
})
  .then(response => {
    console.log(response); // Axios response
  });

// Basic auth
api.advanced.withURLParams({
  body: { example: 'example' }, // this is how to send body params
  query: { example: 'example' }, // this is how to send query params
  headers: { Authorization: 'Bearer example' }, // this is how to send header params
  params: { id: 'urlParam' }, // This is how to send path params
  auth: { password: 'pwd', username: 'nickname' }, // this is how you add basic auth for each request
})
  .then(response => {
    console.log(response); // Axios response
  });
````

## Intercepting requests

In some scenarios, it might be needed to have a fine-grained control on request or the responses. For example, to
refresh a token when it is expired or to handle errors in a specific way. This can be achieved by using
the [interceptors](https://axios-http.com/docs/interceptors) option provided by Axios. These interceptors can be set-up
in the following way:

```js
const request = require('config-req');

// Your env configuration
const config = {
  activateAccount: {
    url: 'http://localhost:5000/v1/account/activate',
    method: 'post',
  },

};

const api = request(config, {
  interceptors: {
    request: (config) => {
      // Do something before request is sent
      return config;
    },
    response: {
      success: (response) => {
        // Do something with response data
        return response;
      },
      error: (error) => {
        // Do something with response error
        return Promise.reject(error);
      }
    }
  }
});

```

## How to contribute

To contribute you must send a PR. This is how you can run the project as a developer.

### Run as contributor

Install dependencies

```
npm install
```

Execute tests

```
npm run test
```
