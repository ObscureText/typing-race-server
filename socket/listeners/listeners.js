const events = require("../events/events");

const configureSocketListeners = (io) => {
    let onlineUsersCount = 0;
    let rooms = [];

    io.on(events.listen.CONNECTION, (socket) => {
        onlineUsersCount++;
        io.emit(events.emit.ONLINE_USERS_COUNT, onlineUsersCount);
        console.log("New user connected", socket.id);

        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/

        socket.on(events.listen.CREATE_ROOM, ({ roomId, roomName, isPrivate }) => {
            const room = {
                roomId: roomId,
                roomName: roomName,
                isPrivate: isPrivate,
                players: [],
            };
            rooms = [...rooms, room];
            console.log("Socket rooms - ", rooms);
        });

        socket.on(events.listen.JOIN_ROOM, ({ nickName, isOwner, socketId, roomId }) => {
            const player = { nickName, isOwner, socketId };
            rooms = rooms.map((room) => {
                if (room.roomId === roomId) {
                    const players = room.players || [];
                    return {
                        ...room,
                        players: [...players, player]
                    }
                } else {
                    return room;
                }
            });
            const room = rooms.find((room) => room.roomId === roomId);
            const players = room?.players || [];
            players.forEach((plr) => {
                io.to(plr.socketId).emit(events.emit.PLAYER_JOINED, players);
            })
        });


        socket.on(events.listen.EXIT_ROOM, ({ socketId, roomId }) => {
            rooms = rooms.map((room) => {
                if (room.roomId === roomId) {
                    const players = room.players.filter((player) => player.socketId !== socketId);
                    return {
                        ...room,
                        players
                    }
                } else {
                    return room;
                }
            });
            const room = rooms.find((room) => room.roomId === roomId);
            const players = room?.players || [];
            players.forEach((plr) => {
                io.to(plr.socketId).emit(events.emit.PLAYER_LEAVED, players);
            })
        });

        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/

        socket.on(events.listen.DISCONNECT, () => {
            onlineUsersCount--;
            io.emit(events.emit.ONLINE_USERS_COUNT, onlineUsersCount);
            console.log("User disconnected", socket.id);
        });
    });
};

module.exports = configureSocketListeners;
