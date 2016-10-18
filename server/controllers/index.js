var authLogin = require('../controllers/auth/login'),
    authRegister = require('../controllers/auth/register');


var welcome = function (req, res, next) {
  res.send('hello, welcome to the homeautomation api');
};

module.exports = {
  welcome: welcome,
  auth: {
    authenticate: authLogin.authenticate,
    register: authRegister.register,
  }
};
