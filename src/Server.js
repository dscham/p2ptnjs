// Imports
const WebSocket = require('ws');
const connectionHandler = require('./ConnectionHandler');

class Server {   
    constructor() {
        console.log('Constructing Server...');
        this.peers = [];
        this.resources = [];
        this.server = new WebSocket.Server({ 'port': 4242 }, () => console.log('Started Listening on:', this.server.address()));
        this.server.on('connection', (socket) => connectionHandler(this, socket));
    }
}

module.exports = Server;
