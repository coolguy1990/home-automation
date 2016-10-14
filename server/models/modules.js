const { bookshelf, TABLES } = require('../db.js');

require('./Users');
let Modules = bookshelf.Model.extend({
  tableName: TABLES.MODULES,
  user: function () {
    return this.belongsTo(TABLES.USERS);
  },
  // components: function () {
  //   return this.belongsToMany(TABLES.COMPONENTS, ['component_module_pivot'], 'module_id', 'component_id');
  // }
})

module.exports = bookshelf.model(TABLES.MODULES, Modules);
