const config = require('../config');
const ws = require('socket.io');
const { normalizePort } = require('../utils/network');

const port = normalizePort(config.PORTS.ws);
const io = ws.listen(port);

io.sockets.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('disconnect', function () {
    console.log(socket.id + ' left');
  });
  io.emit('message', `its alive.... ${socket.id}`);

  socket.on('button-clicked', function (data) {
    console.log('Button Status:' + data);
  });
});

module.exports = io;
