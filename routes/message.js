const express = require('express');
const router = express.Router();
const query = require('../db/query');
const formatResponse = require('../utilities/format-response');

router.get('/', function (req, res) {
  query('messages')
    .all()
    .then(formatResponse)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  query('messages')
    .add(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});


router.get('/:id', function (req, res) {
  query('messages')
    .one(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});



module.exports = router;
