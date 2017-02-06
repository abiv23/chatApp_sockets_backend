const R = require('ramda');

module.exports = (function() {

  const format = (array) => {
    return R.assoc('data', array, {});
  }

  return format;
}());
