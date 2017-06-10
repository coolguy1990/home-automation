const express = require('express');

const router = express.Router();
const Log = require('../utils/logger');

/* GET home page. */
router.get('/', (req, res) => {
  Log.info('tesitng');
  res.render('index', { title: 'Express', });
});

module.exports = router;
