const db = require('../connection');
const R = require('ramda');
const password = require('../utils/password');

module.exports = (function() {
  const relations = ['user', 'room', 'message'];
  const queries = {
    all: (rel) => db(rel),
    one: (rel, id) => db(rel).where('id', id)
  }

  class Query {
    constructor(rel) {
      this.rel = rel;
    }

    all() {
      return db(this.rel);
    }

    one(id) {
      return db(this.rel)
        .where('id', id)
        .first()
    }

    by(field, val) {
      return db(this.rel)
        .where(field, val)
        .first();
    }

    delete(id) {
      return db(this.rel)
        .where('id', id)
        .del();
    }

    update(id, info) {
      return db(this.rel)
        .where('id', id)
        .returning(this._infoToArr(info))
        .update(info)
        .then(R.head);
    }

    add(info) {
      if (!info.password) {
        delete info.password;
        return db(this.rel)
          .returning(this._infoToArr(info))
          .insert(info);
      } else {
        info.password = password.hash(info.password);
        return db(this.rel)
          .returning(this._infoToArr(info))
          .insert(info);
      }
    }

    _infoToArr(info) {
      return R.keys(R.dissoc('password', info));
    }
  }

  const main = function (relation) {
    if (!R.contains(relation, relations)) {
      return Promise.reject(
        new Error('Query for a user or a marker!')
      )
    } else {
      return new Query(relation);
    }
  }

  return main;
}());
