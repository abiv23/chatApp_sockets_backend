const express = require('express');
const router = express.Router();
const query = require('../db/query');


router.get('/', function (req, res) {
  console.log('getting users');
  query('users')
    .all()
    .then(users => {
      res.json(users);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  console.log('creating user');
  query('users')
    .add({username: 'testName'})
    .then(user => {
      return res.json(user);
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
