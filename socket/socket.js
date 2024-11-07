const socketIO = require('socket.io');
const configureSocketListeners = require('./listeners/listeners');

const startSocket = (server) => {
    
    const originUrl = 'http://localhost:3000'
	const io = socketIO(server, {
		cors: {
			origin: [originUrl, 'http://127.0.0.1:3000', 'http://192.168.43.73:3000'],
			methods: ['GET', 'POST'],
		},
	});

    configureSocketListeners(io);
}

module.exports = startSocket;