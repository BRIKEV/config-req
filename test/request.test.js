const nock = require('nock');
const request = require('..');

const HOST = 'http://localhost:5000';
const PATH = '/v1/account/activate';

const options = {
  activateAccount: {
    url: `${HOST}${PATH}`,
    method: 'post',
  },
  activateAccountById: {
    url: `${HOST}${PATH}/:accountId`,
    method: 'post',
  },
};

describe('Request utility tests', () => {
  it('should return object with activateAccount key', () => {
    const noRequestConfig = { active: { nomore: {} } };
    const instance = request(noRequestConfig);
    expect(instance).toEqual(noRequestConfig);
  });

  it('should return object with activateAccount key', () => {
    const instance = request(options);
    expect(instance).toHaveProperty('activateAccount');
  });

  it('should display an empty array as a response', () => {
    const resolved = new Promise(r => r({ data: [] }));
    let instance = request(options);
    instance = { ...instance, activateAccount: jest.fn(() => resolved) };
    return instance.activateAccount()
      .then(({ data }) => {
        expect(data).toEqual([]);
      });
  });
  
  describe('Test with namespace registration', () => {
    const namespaceOptions = { registration: { ...options } };
    it('should return object with activateAccount key with namespace', () => {
      const instance = request(namespaceOptions);
      expect(instance).toHaveProperty('registration');
      expect(instance.registration).toHaveProperty('activateAccount');
    });

    it('should display an empty array as a response', () => {
      const resolved = new Promise(r => r({ data: [] }));
      let instance = request(namespaceOptions);
      instance = {
        ...instance,
        registration: {
          activateAccount: jest.fn(() => resolved)
        },
      };
      return instance.registration.activateAccount()
        .then(({ data }) => {
          expect(data).toEqual([]);
        });
    });
  });

  describe('E2E test mocking request with nock', () => {
    const MOCK_RESPONSE = [];

    beforeEach(() => {
      nock.cleanAll();
      nock(HOST)
        .post(PATH)
        .reply(200, MOCK_RESPONSE);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should display an empty array as a response', () => {
      const instance = request(options);
      return instance.activateAccount()
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });

    it('should display an empty array as a response when we passed a request object with body', () => {
      const req = {
        body: { data: 1 },
      };
      nock.cleanAll();
      nock(HOST)
        .post(PATH, req.body)
        .reply(200, MOCK_RESPONSE);
      const instance = request(options);
      return instance.activateAccount(req)
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });

    it('should display an empty array as a response when we passed query params', () => {
      const req = {
        query: { data: 1 },
      };
      nock.cleanAll();
      nock(HOST)
        .post(`${PATH}?data=1`)
        .reply(200, MOCK_RESPONSE);
      const instance = request(options);
      return instance.activateAccount(req)
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });

    it('should display an empty array as a response when we passed query params and URL params', () => {
      const req = {
        fullRequest: true,
        query: { data: 1 },
        params: { accountId: 1 },
      };
      nock.cleanAll();
      nock(HOST)
        .post(`${PATH}/1?data=1`)
        .reply(200, MOCK_RESPONSE);
      const instance = request(options);
      return instance.activateAccountById(req)
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });

    it('should display an empty array as a response when we passed old URLParams interface', () => {
      const req = {
        query: { data: 1 },
        urlParams: { accountId: 1 },
      };
      nock.cleanAll();
      nock(HOST)
        .post(`${PATH}/1?data=1`)
        .reply(200, MOCK_RESPONSE);
      const instance = request(options);
      return instance.activateAccountById(req)
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });

    it('should display an empty array as a response when we passed old URLParams interface and new one', () => {
      const req = {
        query: { data: 1 },
        urlParams: { accountId: 1 },
        params: { accountId: 2 },
      };
      nock.cleanAll();
      nock(HOST)
        .post(`${PATH}/1?data=1`)
        .reply(200, MOCK_RESPONSE);
      const instance = request(options);
      return instance.activateAccountById(req)
        .then(({ data }) => {
          expect(data).toEqual(MOCK_RESPONSE);
        });
    });
  });
});
