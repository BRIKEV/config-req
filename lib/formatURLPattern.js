const debug = require('debug')('config-req:lib:formatURLPattern');

module.exports = (path, match) => {
  debug('FORMATTING PATH', path);
  const url = new URL(path);
  let { pathname } = url;
  const pattern = /\:(\w*)\/?/g; // eslint-disable-line no-useless-escape
  const matches = pathname.match(pattern) || [];
  debug('URL PARAMS MATCHES', matches);
  matches.forEach(str => {
    const key = str.replace(/\/|:/g, '');
    const value = match[key];
    const re = new RegExp(`\:${key}`); // eslint-disable-line no-useless-escape
    pathname = pathname.replace(re, value);
  });
  debug('PATH FORMATTED', pathname);
  url.pathname = pathname;

  return url.href;
};
