const express = require("express");
const { generateRoom } = require("../helpers/routeHelpers");
const router = express.Router();

let rooms = [];

router.post("/create-room", (req, res) => {
    const { roomName, isPrivate } = req.body;
    const room = generateRoom(roomName, isPrivate, rooms);
    rooms = [room, ...rooms];
    console.log('Route rooms - ', rooms);
    return res.status(200).json(room.roomId);
});

router.post("/join-room", (req, res) => {
    const { roomId } = req.body;
    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
        return res.status(200).send(room);
    } else {
        return res.status(204).send("room not found");
    }
});

module.exports = router;
