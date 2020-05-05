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

        setInterval(() => this.gcPeers(this), 3600 * 1000);
        setInterval(() => this.gcResources(this), 3600 * 1000);
    }

    gcPeers($) {
        console.log("Cleaning up peers...");
        for (let index = 0; index < $.peers.length; index++) {

        }
    }

    gcResources($) {
        console.log("Cleaning up resources...");
        for (let index = 0; index < $.resources.length; index++) {

        }
    }
}

module.exports = Server;
