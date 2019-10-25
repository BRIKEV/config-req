const formatURLPattern = require('../../lib/formatURLPattern');

describe('formatURLPattern utility tests', () => {
  it('should return url', () => {
    const match = {};
    const path = 'http://localhost/api/teams';
    const result = formatURLPattern(path, match);
    const expected = 'http://localhost/api/teams';
    expect(result).toEqual(expected);
  });

  it('should return url formated with params', () => {
    const match = { id: 123 };
    const path = 'http://localhost/api/teams/:id';
    const result = formatURLPattern(path, match);
    const expected = 'http://localhost/api/teams/123';
    expect(result).toEqual(expected);
  });

  it('should return complex url formated with params', () => {
    const match = { id: 123, accountId: 'id-123', contact: '12' };
    const path = 'http://localhost/api/teams/:id/account/:accountId/contact/:contact';
    const result = formatURLPattern(path, match);
    const expected = 'http://localhost/api/teams/123/account/id-123/contact/12';
    expect(result).toEqual(expected);
  });
});
