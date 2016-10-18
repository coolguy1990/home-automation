let models = require('../models'),
  bcrypt = require('bcryptjs'),
  Promise = require('bluebird');

models.init();

module.exports = {
  //get all users
  getAllUsers: function getAllUsers() {
    return models.Users.forge()
      .fetch();
  },

  //create user
  //need to promisify this
  createUser: function createUser(obj, callback) {
    var objHolder = {
      name: obj.name,
      email: obj.email,
      password: bcrypt.hashSync(obj.password, process.env.APP_SECRET)
    };

    new models.User(objHolder)
    .fetch()
    .then(function (user) {
      if (user) {
        callback(new Error('user already present'), null);
      } else {
        var user = new models.User(objHolder);
        user.save().then(function(newUser) {
          callback(null, newUser.attributes);
        });
      }
    });
  },

  //update user
  updateUser: function updateUser(userId, obj, callback) {
    return models.User.forge({
      id: userId
    })
    .fetch({
      require: true
    })
    .then(function (user) {
      callback(
        user.save({
          name: obj.name || user.get('name'),
          email: obj.email || user.get('email'),
        })
      );
    })
  },

  //delete user
  deleteUser: function deleteUser(userId, callback) {
    return models.User.forge({
      id: userId
    })
    .fetch({
      require: true
    })
    .then(function (user) {
      callback(
        user.destroy()
      )
    });
  },

  //get user
  getUserById: function getUserById(userId) {
    return models.User.forge({
      id: userId
    })
    .fetch();
  },

  //get user by email
  getUserByEmail: function getUserByEmail(email) {
    return models.User.forge()
      .query({
        where: {
          email: email
        }
      })
      .orderBy('created_at', 'DESC')
      .fetch();
  },
};
