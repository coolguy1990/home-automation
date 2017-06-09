const TcpServer = require('./tcp');
const UdpServer = require('./udp');

const PORT = 22222;

const server = (new TcpServer({
    port: PORT
}));

let modules = [];

server.on('connected', (socket) => {
    console.log('CONNECTED: ', socket.remoteAddress, socket.remotePort);
    let value = true;
    modules.push({
      websocket: this.websocket('/test-rooms'),
      client: socket
    });
    setInterval(() => {
        if (socket.destroyed)
            return;
        data = JSON.stringify({
            type: 'COMMAND',
            component: 'RELAY',
            prop: 'SWITCH',
            value: value ? 1 : 0
        });
        value = !value;
        socket.write(data);
        console.log(`sending to ${socket.remoteAddress}:${socket.remotePort}`)
    }, 5000);
});

server.on('message', (socket, data) => {
    console.log(`received from ${socket.remoteAddress}:${socket.remotePort}- `, data.toString());
});


// UDP Layer

const broadcastListener = (new UdpServer({
    port: PORT
}));

broadcastListener.on('message', function (msg, rinfo) {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    this.server.send("TEST ${msg}", rinfo.port, rinfo.address);
});

module.exports = server;
module.exports.broadcaster = broadcastListener;
