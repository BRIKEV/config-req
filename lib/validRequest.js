
module.exports = (request, availableKeys) => {
  const requestKeys = Object.keys(request);
  if (requestKeys.length === 0) return true;
  const validKeys = requestKeys.filter(key => availableKeys.includes(key));
  return validKeys.length === availableKeys.length;
};
