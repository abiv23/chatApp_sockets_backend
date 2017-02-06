const request = require('request');

class DBModel {

  constructor(name) {
    this.attributes = attributes;
    this.endpoints = endpoints;
  }

  save(info) {
    // logging message until DB server is ready.
    return console.log('Saving info in DB (not really)');
    return new Promise((resolve, reject) => {
      let options = {
        method: 'PUT',
        uri: this.uri,
        body: JSON.stringify(info)
      }
      return request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(response);
        }
      });
    });
  }

  get uri() {
    return `chat.app/${this.name}s`;
  }

  makePath() {
    return `/`
  }
}
