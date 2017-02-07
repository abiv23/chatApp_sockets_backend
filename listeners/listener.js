const broadcast = require('../events/broadcast');
const query = require('../db/query');

module.exports = (function() {
  const listen = () => {
    broadcast.streams['newMessage']
      .subscribe(
        data => console.log('adding message to db!!'),
        error => console.error(error)
      );
  }

  return {listen};
}());
