const R = require('ramda');
const {Subject} = require('rxjs');

module.exports = (function() {
  let registeredEventNames = [
    'newMessage'
  ];

  let streams = R.fromPairs(registeredEventNames.map(name => {
    return [[name], new Subject()]
  }));
  console.log(streams);

  const shout = (eventName, data) => {
    if (!R.contains(eventName, registeredEventNames)) {
      return new Error('Invalid / unregistered name given.');
    } else {
      streams[eventName].next(data);
    }
  }

  return {
    shout,
    streams
  }
}());
