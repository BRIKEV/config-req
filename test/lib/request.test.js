
const request = require('../..');

const options = {
  activateAccount: {
    url: 'http://localhost:5000/v1/account/activate',
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
});
