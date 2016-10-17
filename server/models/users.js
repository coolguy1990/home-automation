var _ = require('lodash'),
    baseBookshelf = require('./base'),
    Promise = require('bluebird'),

    User,
    Users;

User = baseBookshelf.Model.extend({
  tableName: 'users',

  hidden: ['password'],

  modules: function () {
    return this.hasMany('Modules');
  },

  systems: function () {
    return this.hasMany('Systems');
  }
});

Users = baseBookshelf.Collection.extend({
  model: User
});

module.exports = {
  User: baseBookshelf.model('User', User),
  Users: baseBookshelf.collection('Users', Users)
};
