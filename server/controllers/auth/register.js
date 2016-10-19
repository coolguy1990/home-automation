var userRepo = require('../../repositories/UserRepository');

var register = function (req, res, next) {
  userRepo.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {
    res.json({error: false, data: {id: user.id}});
  })
  .catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

module.exports = {
  register: register
};
