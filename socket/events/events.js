const events = {
    listen: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',

        FIND_OPPONENT: 'FIND_OPPONENT',
        USER_DISCONNECTED: 'USER_DISCONNECTED',
        UPDATE_SCORE: 'UPDATE_SCORE',
        STOP_WAITING: 'STOP_WAITING'
    },

    emit: {
        OPPONENT_FOUND: 'OPPONENT_FOUND',
        OPPONENT_DISCONNECTED: 'OPPONENT_DISCONNECTED',
        SCORE_UPDATED: 'SCORE_UPDATED'
    }
}

module.exports = events;