const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const Game = require('./game/game');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});

var port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// makes room images avaliable to client
app.use('/images', express.static('images'));

// start the game
const game = new Game(io);