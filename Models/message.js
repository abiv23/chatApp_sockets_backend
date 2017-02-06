const R = require('ramda');
const DBModel = require('./db-model.js');

const Message = R.construct(DBModel)('message');
