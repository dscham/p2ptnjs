const UUID = require("uuid");

class Peer {
    constructor(socket) {
        this.socket = socket;
        this.online = false;
    }
}

module.exports = Peer;
