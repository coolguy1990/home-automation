var express = require('express');
var router = express.Router();
let Log = require('../utils/logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  Log.info('tesitng');
  res.render('index', { title: 'Express' });
});

module.exports = router;
