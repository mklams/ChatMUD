const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const Game = require('./game/game');
const { createClient } = require('redis');

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


// TODO: move database code to own file
// TODO: save/load users to database
async function setupDatabase(){
  const client = createClient();
  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();
  await client.set('key', 'valueForKey');
  const value = await client.get('key');
  console.log(value);
}

setupDatabase()