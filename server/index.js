const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const Game = require('./game/game');
const {Database} = require('./database')

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

// Setup the database then start the game
const database = new Database();
database.setupDatabase().then(() => {
  // start the game after database is ready
  const game = new Game(io, database);
})