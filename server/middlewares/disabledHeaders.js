module.exports = function (req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
};
