const validRequest = require('../../lib/validRequest');

test('validRequest returns true as the object has valid keys', () => {
  const req = {
    body: {},
    headers: {},
  };
  const validKeys = ['body', 'headers'];
  const expected = true;
  const result = validRequest(req, validKeys);
  expect(result).toEqual(expected);
});

test('validRequest returns false as the object has not valid keys', () => {
  const req = {
    body: {},
    headers: {},
  };
  const validKeys = ['body', 'headers', 'query'];
  const expected = false;
  const result = validRequest(req, validKeys);
  expect(result).toEqual(expected);
});

test('validRequest returns true as the object has more than valid keys', () => {
  const req = {
    body: {},
    headers: {},
    query: '',
    params: {},
  };
  const validKeys = ['body', 'headers', 'query'];
  const expected = true;
  const result = validRequest(req, validKeys);
  expect(result).toEqual(expected);
});
