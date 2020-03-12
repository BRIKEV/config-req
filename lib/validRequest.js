
module.exports = (request, availableKeys) => {
  const requestKeys = Object.keys(request);
  const validKeys = requestKeys.filter(key => availableKeys.includes(key));
  return validKeys.length === availableKeys.length;
};
