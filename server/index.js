const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});

const users = require('./users'); 
const parser = require('./commandParser');

io.on('connection', (socket) => {
  users.setUsername(socket.id, socket.id);
  socket.on('chat message', (msg) => {
    const broadcastMsg = parser.parseMessage(msg, socket);
    io.emit('chat message', broadcastMsg);
  })
})

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

