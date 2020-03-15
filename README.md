
# config-req

![npm](https://img.shields.io/npm/v/config-req)
[![CircleCI](https://circleci.com/gh/kevinccbsg/config-req/tree/master.svg?style=svg)](https://circleci.com/gh/kevinccbsg/config-req/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinccbsg/config-req/badge.svg)](https://snyk.io/test/github/kevinccbsg/config-req) [![Greenkeeper badge](https://badges.greenkeeper.io/kevinccbsg/config-req.svg)](https://greenkeeper.io/)

Axios wrapper based on a config file

## How it works

This modules gives you some axios request methods based on a config so that you don't need to worry about method and URL and how to handle their changes on each environments.

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

## Advance example

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
  },
};

const api = request(options);

api.advanced.withBodyInfo({
  body: { example: 'example' }, // this is how to send body params
  params: { example: 'example' }, // this is how to send query params
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
  params: { example: 'example' }, // this is how to send query params
  headers: { Authorization: 'Bearer example' }, // this is how to send header params
  urlParams: { id: 'urlParam' },
})
  .then(response => {
    console.log(response); // Axios response
  });
````

## Use with Req complete object

You can send a complete req object like the one express.js uses. *Note* for now, it needs to be extended with a flag for version 1.1.0. For version 2.0.0 this will not be needed.

```js
const request = require('config-req');

const options = {
  withURLParams: {
    url: 'http://localhost:5000/v1/account/:id/activate',
    method: 'get',
  },
};

const api = request(options);

const reqObject = {
  body: { example: 'example' }, // this is how to send body params
  params: { example: 'example' }, // this is how to send query params
  headers: { Authorization: 'Bearer example' }, // this is how to send header params
};

// V1 version
api.withURLParams({
  ...reqObject,
  fullRequest: true,
})
  .then(response => {
    console.log(response); // Axios response
  });

// V2 version
api.withURLParams(reqObject)
  .then(response => {
    console.log(response); // Axios response
  });
````

This `fullRequest: true` needs to be added to support in V1 a mix of query params and URL params from a req Object request with the old behaviour.

If you want to change it from V2 you must change this cases:

```js
// if you mix params and urlParams in V2 it won't work as expected
{
  params: { example: 'example' },
  urlParams: { id: 'urlParam' },
  body: { example: 'this is an example' }
}
// just remove it from your code to work with V2
{
  params: { example: 'example' },
  urlParams: { id: 'urlParam' }
}
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
