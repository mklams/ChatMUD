const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});

const Game = require('./game/main');
const game = new Game();
const parser = require('./commandParser');

app.use('/images', express.static('images'));

io.on('connection', (socket) => {
  socket.join("main room");
  game.addPlayer(socket.id, socket.id);
  socket.on('chat message', (msg) => {
    const parsedMessage = parser.parseMessage(msg, socket);
    io.to(parsedMessage.receiver).emit('chat message', parsedMessage.response);
  })
})

io.on('disconnection', (socket) => {
  console.log("disconnect" + socket.id)
})

var port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

