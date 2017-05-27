const TcpServer = require('./tcp');

const server = (new TcpServer({
    port: 22222
}));

server.listen();

server.on('connected', (socket) => {
    console.log('CONNECTED: ', socket.remoteAddress, socket.remotePort);
    let value = true;
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

/*


Server.prototype.handleError = function (err) {
    console.log(`server error:\n${err.stack}`);
    this.server.close();
};

Server.prototype.handle = function (msg, rinfo) {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    this.server.send("TEST", rinfo.port, rinfo.address);
};


Server.prototype.handle = function (socket) {
    socket.setEncoding(this.encoding);
    socket.on('data', (data) => {
        this.handleData(data, socket);
    });
};

Server.prototype.handleData = function (data, socket) {
    data = data.toString(this.encoding);
    socket.write(`${data}\r\nworld!\r\n ${this.port}`);
};*/
