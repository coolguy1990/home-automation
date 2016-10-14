const knex = require('knex');
const environment = 'development';
const dbConfig = require('./config');

const db = knex(dbConfig[environment]);

exports.TABLES = {
  USERS: 'users',
  COMPONENTS: 'components',
  MODULES: 'modules',
  COMPONENT_MODULE_PIVOT: 'component_module_pivot',
  COMPONENT_TYPE: 'component_type',
  SYSTEM_TYPES: 'system_types',
  SYSTEMS: 'systems',
  SYSTEM_SETTINGS: 'system_settings',
  SYSTEM_COMPONENTS: 'system_components'
};

const bookshelf = require('bookshelf')(db);
bookshelf.plugin('virtuals');
bookshelf.plugin('registry');

exports.bookshelf = bookshelf;
exports.db = db;
