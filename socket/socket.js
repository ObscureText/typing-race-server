const socketIO = require('socket.io');
const configureSocketListeners = require('./listeners/listeners');

const startSocket = (server) => {
    
    const originUrl = process.env.ORIGIN_URL || 'http://localhost:3000';
	const io = socketIO(server, {
		cors: {
			origin: [originUrl, "*", 'http://192.168.43.73:3000'],
			methods: ['GET', 'POST'],
			credentials: true, 
		},
	});

    configureSocketListeners(io);
}

module.exports = startSocket;