const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});

const userNames = {};

io.on('connection', (socket) => {
  userNames[socket.id] = socket.id;
  socket.on('chat message', (msg) => {
    const broadcastMsg = parseMessage(msg, socket);
    io.emit('chat message', broadcastMsg);
  })
})

const parseMessage = (msg, socket) => {
  const words = msg.split(" ");
  if(words.length > 1){
    if(words[0] === "setUsername"){
      userNames[socket.id] = words[1];
      return `User ${socket.id} is now ${words[1]}`;  
    }
  }
  const userName = userNames[socket.id];
  return userName + ": " + msg; 
}

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

