var express = require('express');
var router = express.Router();
let io;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(io.sockets.adapter.rooms));
});

function initiate(sockerIO) {
  io = sockerIO;
  return router;
}
module.exports = initiate;
