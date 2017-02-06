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
    .then(room => {
      query('messages')
        .by('room_id', room.id)
        .then(messages => {
          return {room, messages};
        })
        .then(formatResponse)
        .then(response => {
          return res.json(response);
        })
        .catch(console.error);
    })
    .catch(console.error);
});

module.exports = router;
