const express = require('express');
const router = express.router();
const query = '../db/query';


router.get('/', function (req, res) {
  query('user')
    .all()
    .then(users => {
      res.json(users);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  query('user')
    .add(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});

router.get('/:id', function (req, res) {
  query('user')
    .one(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});

module.exports = router;
