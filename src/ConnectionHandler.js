const Peer = require('./Peer');
const Resource = require('./Resource');

// Globals
const COMMAND = 'command';
const PAYLOAD = 'payload'
const P2PTNJS = 'P2PTNJS_'

function connectionHandler($, socket) {
    console.log(`New Connection!`);

    socket.on('message', (message) => messageHandler(message));
    console.log(`Socket message handler started!`);

    socket.on('error', (error) => errorHandler(error));
    console.log(`Socket error handler started!`);

    function messageHandler(content) {
        console.log('Received a Message: ', content);
        if (content.startsWith('"{')) {
            const data = JSON.parse(content);

            if (!data[COMMAND]) {
                socket.send(
                    JSON.stringify(
                        {
                            request: data,
                            message: `No Command!`,
                            details: `I can't accept messages without a command`
                        }
                    )
                );
                return;
            }

            switch (data[COMMAND]) {
                case `${P2PTNJS}PEER` :
                    if (!data[PAYLOAD]) {
                        socket.send(generateNeedPayloadMessage(data[COMMAND]));
                        return;
                    }

                    const newPeer = new Peer(data[PAYLOAD], socket);
                    $.peers.push(newPeer);
                    socket.send(JSON.stringify(newPeer));
                    break;
                case `${P2PTNJS}PEERS` :
                    socket.send(JSON.stringify($.peers));
                    break;
                case `${P2PTNJS}RESOURCE` :
                    if (!data[PAYLOAD]) {
                        socket.send(generateNeedPayloadMessage(data[COMMAND]));
                        return;
                    }

                    const newResource = new Resource(data[PAYLOAD]);
                    $.resources.push(newResource);
                    socket.send(JSON.stringify(newResource));
                    break;
                case `${P2PTNJS}RESOURCES` :
                    socket.send(JSON.stringify($.resources));
                    break;
                case `${P2PTNJS}PEER_RESOURCE` :
                    const resource = $.resources.filter((res) => res.id === data[PAYLOAD].resource)[0];
                    resource.peers.concat(data[PAYLOAD].peers);
                    socket.send(
                        JSON.stringify(
                            {
                                request: data,
                                message :'I added the Peers to the Resource!'
                            }
                        )
                    );
                    break;
                default:
                    socket.send(
                        JSON.stringify(
                            {
                                request: data,
                                message: `Unknown Command!`,
                                details: `I don't know the command '${data[COMMAND]}'. Sorry :(`
                            }
                        )
                    );
                    break;
            }
        } else {
            socket.send(
                JSON.stringify(
                    {
                        request: content,
                        message: `Malformed Message!`,
                        details: `I can only handle stringified JSON.`
                    }
                )
            );
        }

        function generateNeedPayloadMessage(command) {
            return JSON.stringify(
                {
                    request: data,
                    message: `Unknown Command!`,
                    details: `Command: '${command}' requires a payload.`
                }
            );
        }
    }

    function errorHandler(err) {
        console.log('Error!');
        console.error(err);

        throw err;
    }
}

module.exports = connectionHandler;
