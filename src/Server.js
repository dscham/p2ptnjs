const WebSocket = require('ws');
const Peer = require('./Peer')

class Server {   
    constructor() {
        console.log('Constructing Server...');
        this.peers = [];
        this.server = new WebSocket.Server({ port: 4242 });
        this.server.on('listening', () => this.listenHandler(this));
        this.server.on('connection', (socket, request) => this.connectionHandler(this, socket, request));
    }

    listenHandler($) {
        console.log("Started Listening on:", $.server.address());
    }

    connectionHandler($, socket, request) {
        console.log("New Connection!");

        socket.on('message', (message) => messageHandler($, message));
        console.log("Socket message handler started!");

        socket.on('error', (error) => errorHandler($, error));
        console.log("Socket error handler started!");

        function  messageHandler($$, content) {
            console.log('Received a Message: ', content);

            socket.send("Here's a Tracker!");
        }

        function  errorHandler($$, err) {
            console.log('Error!');
            console.error(err);

            throw err;
        }
    }
}

module.exports = Server;
