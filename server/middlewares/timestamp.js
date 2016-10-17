module.exports = function (req, res, next) {
  res.header('X-TIMESTAMP', Date.now());
  next();
};
