const TcpServer = require('../lib/tcp');
const config = require('../config');
const { normalizePort, } = require('../utils/network');
const ws = require('./websockets');

const port = normalizePort(config.PORTS.listener);
const server = (new TcpServer({
  port,
}));

server.on('message', (socket, data) => {
  console.log(`received from ${socket.remoteAddress}:${socket.remotePort}- `, data.toString());
});

const modulesList = [];
server.on('connected', (socket) => {
  console.log('CONNECTED: ', socket.remoteAddress, socket.remotePort);
  let value = true;
  const room = 'test-room';
  modulesList.push({
    room,
    socket,
  });
  console.log('emitting io', room);
  ws.emit('module', room);
  setInterval(() => {
    if (socket.destroyed) { return; }
    const data = JSON.stringify({
      type: 'COMMAND',
      component: 'RELAY',
      prop: 'SWITCH',
      value: value ? 1 : 0,
    });
    value = !value;
    socket.write(data);
    console.log(`sending to ${socket.remoteAddress}:${socket.remotePort}`);
  }, 5000);
});

module.exports = server;
