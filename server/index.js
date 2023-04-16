const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:{origin:"http://localhost:3000"}});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
})

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

