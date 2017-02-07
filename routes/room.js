const R = require('ramda');
const express = require('express');
const router = express.Router();
const query = require('../db/query');
const formatResponse = require('../utilities/format-response');


router.get('/', function (req, res) {
  query('rooms')
    .all()
    .then(users => {
      res.json(users);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  query('rooms')
    .add(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});

router.get('/:name', function (req, res) {
  query('rooms')
    .by('name', req.params.name)
    .then(R.head)
    .then(room => {
      query('messages')
        .by('room_id', room.id)
        .then(messages => {
          return Promise.all(messages.map(message => {
            return query('users')
              .one(message.user_id)
              .then(user => R.assoc('user', user, message))
          }))
          .then(userMessages => {
            return res.json({room, messages: userMessages})
          })
        })

    })
});

module.exports = router;
