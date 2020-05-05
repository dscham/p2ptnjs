const { v4: UUID } = require("uuid");

class Peer {
    constructor(payload, socket) {
        this.id = UUID();
        this.location = payload.location;
        this.online = true;
        this.displayName = payload.displayName ? payload.displayName : '';

        this.socket = socket;
    }
}

module.exports = Peer;
