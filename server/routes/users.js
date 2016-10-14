var express = require('express');
var router = express.Router();
var models = require('../models');

models.init();

router.get('/', function (req, res, next) {
  models.User.forge({
    name: 'Kunal Mangaraj',
    email: 'mangaraj.kunal@gmail.com',
    password: 'testing'
  })
  .save()
  .then(function (user) {
    res.json({error: false, data: {id: user.get('id')}});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.get('/all', function (req, res, next) {
  models.Users.forge()
  .fetch()
  .then(function (collection) {
    res.json({
      error: false,
      data: collection.toJSON()
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
