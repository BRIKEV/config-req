// @examples on the unit tests '../../test/unit/lib/formatURLPattern'
module.exports = (path, match) => {
  const url = new URL(path);
  let { pathname } = url;
  const pattern = /\:(\w*)\/?/g; // eslint-disable-line no-useless-escape
  const matches = pathname.match(pattern) || [];
  matches.forEach(str => {
    const key = str.replace(/\/|:/g, '');
    const value = match[key];
    const re = new RegExp(`\:${key}`); // eslint-disable-line no-useless-escape
    pathname = pathname.replace(re, value);
  });

  url.pathname = pathname;

  return url.href;
};
