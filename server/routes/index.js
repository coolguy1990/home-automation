var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

router.get('/', authController.welcome);

module.exports = router;
