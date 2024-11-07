const events = {
    listen: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',

        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_ROOM: 'JOIN_ROOM',
        EXIT_ROOM: 'EXIT_ROOM',
    },

    emit: {
        ONLINE_USERS_COUNT: 'ONLINE_USERS_COUNT',
        ROOM_CREATED: 'ROOM_CREATED',
        PLAYER_JOINED: 'PLAYER_JOINED',
        PLAYER_LEAVED: 'PLAYER_LEAVED'
    }
}

module.exports = events;