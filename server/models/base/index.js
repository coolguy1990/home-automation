var _ = require('lodash'),
    knex = require('knex'),
    Promise = require('bluebird'),
    uuid = require('node-uuid'),
    moment = require('moment'),
    bookshelf = require('bookshelf'),
    config = require('../../config'),
    environment = process.env.APP_ENV || 'development',
    db = knex(config[environment]),
    bcrypt = require('bcryptjs'),
    baseBookshelf,
    proto;

baseBookshelf = bookshelf(db);
baseBookshelf.plugin('registry');
baseBookshelf.plugin('virtuals');
baseBookshelf.plugin('visibility');

//Cache instance of base model prototype
proto = baseBookshelf.Model.prototype;

//Base Model
baseBookshelf.Model = baseBookshelf.Model.extend({
  hasTimestamps: true,

  //default value setup for each model
  defaults: function defaults() {
    return {
      uuid: uuid.v4()
    };
  },

  //When loading an instance, default values to fetch
  defaultColumnsToFetch: function defaultColumnsToFetch() {
    return [];
  },

  //fix dates before saving to db
  fixDatesWhenSave: function fixDates(attrs) {
    var self = this;
    _.each(attrs, function each(value, key) {
      if (value !== null && (key == 'updated_at' || key == 'created_at')) {
        attrs[key] = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
    });

    return attrs;
  },

  //fix dates when fetching
  fixDatesWhenFetch: function fixDates(attrs) {
    var self = this;

    _.each(attrs, function each(value, key) {
      if (value !== null && (key == 'updated_at' || key == 'created_at')) {
        attrs[key] = moment(value).toDate();
      }
    });

    return attrs;
  },

  fixPasswordHashes: function fixHashes(attrs) {
    var self = this;

    _.each(attrs, function each(value, key) {
      if (value !== null && key == 'password') {
        attrs[key] = bcrypt.hashSync(value, 10);
      }
    });

    return attrs;
  },

  //format date before writing
  format: function format(attrs) {
    return this.fixPasswordHashes(this.fixDatesWhenSave(attrs));
  },

  //format date before reading
  parse: function parse(attrs) {
    return this.fixDatesWhenFetch(attrs);
  },

  //get updated attributes before .save or .call
  updatedAttributes: function updatedAttributes() {
    return this._updatedAttributes || {};
  },

  //get specific updated value
  updated: function updated(attr) {
    return this.updatedAttributes(attr);
  },

  hasDateChanged: function (attr) {
    return moment(this.get(attr)).diff(moment(this.updated(attr))) !== 0;
  },
});

module.exports = baseBookshelf;
