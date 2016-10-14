var _ = require('lodash'),
    exports,
    models;

exports = module.exports;

models = [
  'users'
];

function init() {
  exports.Base = require('./base'),

  models.forEach(function (name) {
    _.extend(exports, require('./' + name));
  });
}

exports.init = init;
