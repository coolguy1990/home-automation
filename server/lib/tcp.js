const net = require('net');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

const Server = function (config) {
    const { port, host, encoding } = config;
    this.encoding = encoding || 'utf8';
    this.port = port;
    this.host = host || '0.0.0.0';

    this.clients = [];

    this.handle = this.handle.bind(this);

    EventEmitter.call(this);

    this.server = net.createServer((socket) => {
        this.clients.push(socket);
        this.handle(socket);
        this.emit('connected', socket);
    });

    this.server.on('error', (err) => {
        this.emit('error', err);
    });

    this.server.on('close', (err) => {
        this.emit('close', err);
    });

    Object.defineProperty(this, 'handle', {
        enumerable: false,
        configurable: false,
        writable: false
    });
};

inherits(Server, EventEmitter);

Server.prototype.listen = function () {
    this.server.listen(this.port, this.host);
};

Server.prototype.handle = function (socket) {
    socket.setEncoding(this.encoding);

    // Events
    socket.on('data', (data) => {
        this.emit('message', socket, data);
    });

    socket.on('error', (err) => {
       this.emit('socket_error', err);
    });

    socket.on('close', (had_error) => {
        this.emit('socket_close', had_error);
    });
};

module.exports = Server;
