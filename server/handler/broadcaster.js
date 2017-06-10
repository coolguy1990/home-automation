const UdpServer = require('../lib/udp');
const config = require('../config');
const { normalizePort, } = require('../utils/network');

const port = normalizePort(config.PORTS.broadcaster);
const broadcaster = (new UdpServer({
  port,
}));

broadcaster.on('message', function onMsg(msg, rinfo) {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  this.server.send(`TEST ${msg}`, rinfo.port, rinfo.address);
});

module.exports = broadcaster;
