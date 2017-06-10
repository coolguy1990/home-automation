const mongoose = require('mongoose');
// const Log = require('../utils/logger');

const mongoDB = 'mongodb://127.0.0.1/homeautomation';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

module.exports = db;
