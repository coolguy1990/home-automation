var welcome = function (req, res, next) {
  res.send('hello, welcome to the homeautomation api');
};

module.exports = {
  welcome: welcome
};
