
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

## License

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
