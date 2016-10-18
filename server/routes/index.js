var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.welcome);
router.post('/login', controller.auth.authenticate);
router.post('/register', controller.auth.register);

module.exports = router;
