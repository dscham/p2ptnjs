const { v4: UUID } = require("uuid");

class Resource {
    constructor(payload) {
        this.id = UUID();
        this.topic = payload.topic;
        this.peers = payload.peers ? payload.peers : [];

        this.lastActive = new Date();
    }
}

module.exports = Resource;
