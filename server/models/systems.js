const { bookshelf, TABLES } = require('../db.js');

require('./Users');
let Systems = bookshelf.Model.extend({
  tableName: TABLES.SYSTEMS,
  user: function () {
    return this.belongsTo(TABLES.USERS);
  },
  // systemTypes: function () {
  //   return this.belongsTo(TABLES.SYSTEM_TYPES)
  // }
});

module.exports = bookshelf.model(TABLES.SYSTEMS, Systems);
