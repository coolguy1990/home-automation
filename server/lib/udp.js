const dgram = require('dgram');

const Server = function Server(config) {
  const { port, host, encoding, broadcast, } = config;

  this.encoding = encoding || 'utf8';
  this.port = port;
  this.host = host || '0.0.0.0';
  this.broadcast = broadcast || false;

  this.server = dgram.createSocket('udp4');
};

Server.prototype.on = function on(msg, func) {
  this.server.on(msg, func.bind(this));
};

Server.prototype.listen = function listen() {
  this.server.bind(this.port, () => {
    this.server.setBroadcast(this.broadcast);
  });
};

module.exports = Server;
