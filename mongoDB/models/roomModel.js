const mongoose = require('mongoose')

const RoomModel = new mongoose.Schema({
    roomId: { type: Number },
    roomName: { type: String },
    isPrivate: { type: Boolean },
});

module.exports = mongoose.model("Message", RoomModel, 'messages');

// roomId: Math.floor(10000 + Math.random() * 90000),
// roomName: roomName,
// isPrivate: isPrivate,
// players: [
//     {
//         nickName: nickName,
//         socketId: socket.id,
//         isOwner: true,
//     }
// ]