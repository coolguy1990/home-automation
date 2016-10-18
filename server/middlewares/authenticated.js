//allow crossorigin
module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    //verify token
    jwt.verify(token, process.env.APP_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate',
          reason: err
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // no token present
    return res
      .status(403)
      .send({
        success: false,
        message: 'No token provided'
      });
  }
};
