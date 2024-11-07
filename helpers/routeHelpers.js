const generateRoomId = (rooms) => {
    if (rooms.length === 0) {
        return 10000;
    } else {
        const firstRoomId = rooms[0].roomId;
        return firstRoomId + Math.floor(Math.random() * 10) + 1;
    }
};

const generateRoom = (roomName, isPrivate, rooms) => {
    return {
        roomId: generateRoomId(rooms),
        roomName: roomName,
        isPrivate: isPrivate,
    };
};

module.exports = { generateRoomId, generateRoom };
