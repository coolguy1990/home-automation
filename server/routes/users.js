var express = require('express');
var Users = require('../models/Users.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = new Users({
    'email': 'mangaraj.kunal@gmail.com',
    'name': 'Kunal Mangaraj',
    'password': 'testing'
  }).save()
  .then(function () {
    return res.json(Users.collection().fetch());
  });
});

module.exports = router;
