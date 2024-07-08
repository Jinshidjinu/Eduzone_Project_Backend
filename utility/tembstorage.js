

const tempStorage = new Map();

module.exports = {
  set: (key, value) => tempStorage.set(key, value),
  get: (key) => tempStorage.get(key),
  delete: (key) => tempStorage.delete(key)
};