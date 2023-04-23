const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});
app.use('/images', express.static('images'));

const Game = require('./game/game');
const game = new Game(io);

var port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

