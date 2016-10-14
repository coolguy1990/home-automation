let UserModel = require('../models/Users');
const bookshelf = app.get('bookshelf');

let UserRepository = bookshelf.Collection.extend({
  model: UserModel
});

module.exports = UserRepository;
