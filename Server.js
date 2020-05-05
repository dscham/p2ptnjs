const WebSocket = require('ws');
const Peer = require('./Peer')

class Server {   
    constructor() {
        console.log('Constructing Server');
        this.peers = [];

        this.server = new WebSocket.Server({ port: 4242 });
        this.server.on('listening', () => this.listenHandler(this));
        this.server.on('connection', (socket, request) => this.connectionHandler(this, socket, request));
        this.server.on('message', (message) => this.messageHandler(this, message));
        this.server.on('error', (error) => this.errorHandler(this, error));
    }

    listenHandler($) {
        console.log('opened server on', $.server.address());
        console.log('listen peers:', $.peers.length);
    }

    connectionHandler($, socket, request) {
        $.peers.push(new Peer(socket, request));
        socket.send(
            JSON.stringify({
                socket: socket,
                request: request
            })
        );
        console.log('connection peers:', $.peers);
    }

    messageHandler($, event) {
        console.log('Receieved Message', event);
    }

    errorHandler($, err) {
        throw err;
    }
}

module.exports = Server;

