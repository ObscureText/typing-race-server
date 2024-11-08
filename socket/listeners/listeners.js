const events = require("../events/events");

const configureSocketListeners = (io) => {
    let players = [];

    io.on(events.listen.CONNECTION, (socket) => {
        console.log("New user connected", socket.id);

        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/

        socket.on(events.listen.FIND_OPPONENT, ({ socketId, nickName }) => {
            if (socketId) {
                if (players.length === 0) {
                    players = [{ socketId, nickName }];
                } else {
                    const existingPlayer = players[0];
                    const arrivedPlayer = { socketId, nickName };
                    
                    console.log('Arriving', arrivedPlayer);
                    console.log('Existing', existingPlayer);
                    
                    players = players.filter((_, index) => index !== 0);
                    socket.emit(events.emit.OPPONENT_FOUND, existingPlayer);
                    io.to(existingPlayer.socketId).emit(
                        events.emit.OPPONENT_FOUND,
                        arrivedPlayer,
                    );
                }
            }
        });

        socket.on(events.listen.STOP_WAITING, (socketId) => {
            players = players.filter((player) => player.socketId !== socketId);
            console.log('Waiting stop', players)
        });

        socket.on(events.listen.USER_DISCONNECTED, (opponentSocketId) => {
            io.to(opponentSocketId).emit(events.emit.OPPONENT_DISCONNECTED);
        });

        socket.on(events.listen.UPDATE_SCORE, ({ opponentSocketId, score }) => {
            socket.emit(events.emit.SCORE_UPDATED, { currentScore: score });
            io.to(opponentSocketId).emit(events.emit.SCORE_UPDATED, { opponentScore: score });
        });

        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------------*/

        socket.on(events.listen.DISCONNECT, () => {
            console.log("User disconnected", socket.id);
        });
    });
};

module.exports = configureSocketListeners;
