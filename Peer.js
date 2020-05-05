class Peer {
    constructor(socket, request) {
        this.socket = socket;
        this.request = request;
        this.id = this.getNextId();
    }
}

Peer.prototype.nextId = 0;
Peer.prototype.getNextId = function () {
    const tempId = this.nextId;
    this.nextId++;
    return tempId;
};

module.exports = Peer;