var { bookshelf, TABLES } = require('../db.js');

require('./Modules');
require('./Systems');
let Users = bookshelf.Model.extend({
  tableName: TABLES.USERS,
  hasTimestamps: true,
  modules: function () {
    return this.hasMany(TABLES.MODULES);
  },
  systems: function () {
    return this.hasMany(TABLES.SYSTEMS);
  }
});

module.exports = bookshelf.model(TABLES.USERS, Users);
