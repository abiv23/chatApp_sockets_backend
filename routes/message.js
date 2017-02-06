const express = require('express');
const router = express.router();
const query = '../db/query';


router.get('/', function (req, res) {
  query('message')
    .all()
    .then(users => {
      res.json(users);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  query('message')
    .add(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});

router.get('/:id', function (req, res) {
  query('message')
    .one(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});

module.exports = router;
