const http = require('http');
const config = require('./config');
const { normalizePort, } = require('./utils/network');
// eslint-disable-next-line no-unused-vars
const { www, websockets: ws, broadcaster, listener, } = require('./handler');

const port = normalizePort(config.PORTS.www);
www.set('port', port);

listener.listen();
broadcaster.listen();

module.exports = http.createServer(www);
