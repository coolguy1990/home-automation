var express = require('express');
var router = express.Router();
var models = require('../models');
var userRepo = require('../repositories/UserRepository');

models.init();

router.get('/', function (req, res, next) {
  userRepo.createUser({
    name: 'Kunal Mangaraj',
    email: 'mangaraj.kunal@gmail.com',
    password: 'testing'
  })
  .then(function (user) {
    res.json({error: false, data: {id: user.get('id')}});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.get('/all', function (req, res, next) {
  //update user
  // userRepo.updateUser(2, {
  //   name: 'testing'
  // }, function (user) {
  //   user
  //   .then(function () {
  //     res.json({error: false, data: {message: 'User details updated'}});
  //   })
  //   .catch(function (err) {
  //     res.status(500).json({error: true, data: {message: err.message}});
  //   })
  // })
  // .catch( function (err) {
  //   res.status(500).json({error: true, data: {message: err.message}});
  // });

  //delete user
  // userRepo.deleteUser(2, function (user) {
  //   user
  //   .then(function () {
  //     res.json({error: true, data: {message: 'User successfully deleted'}});
  //   })
  //   .catch(function (err) {
  //     res.status(500).json({error: true, data: {message: err.message}});
  //   })
  // })
  // .catch(function (err) {
  //   res.status(500).json({error: true, data: {message: err.message}});
  // });

  //get user
  // userRepo
  // .getUserById(1)
  // .then(function (user) {
  //   if (!user) {
  //     res.status(404).json({error: true, data: {}});
  //   }

  //   res.json({error: false, data: user.toJSON()});
  // })
  // .catch(function (err) {
  //   res.status(500).json({error: true, data: {message: err.message}});
  // });

  //get all users
  userRepo.getAllUsers()
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
