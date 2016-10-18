let models = require('../models'),
  bcrypt = require('bcryptjs');

models.init();

module.exports = {
  //get all users
  getAllUsers: function getAllUsers() {
    return models.Users.forge()
      .fetch();
  },

  //create user
  createUser: function createUser(obj) {
    return models.User.forge({
      name: obj.name,
      email: obj.email,
      password: bcrypt.hashSync(obj.password, process.env.APP_SECRET)
    })
    .save();
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
  getUserById: function getUser(userId) {
    return models.User.forge({
      id: userId
    })
    .fetch();
  },

  //get user by email
  getUserByEmail: function getUserByEmail(email) {
    return models.User.forge({
      email: email
    })
    .orderBy('users.created_at', 'DESC')
    .fetch({
      require: true
    });
  },
};
