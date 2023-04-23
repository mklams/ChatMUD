const Players = require('./players');
const CommandParser = require('../commandParser');
const Levels = require('./levelBuilder');

class Game{
    constructor(server) {
        this.players = new Players();
        this.parser = new CommandParser();
        this.server = server;
        this.server.on('connection', this.onSocketConnected);
        this.server.on('disconnection', this.onSocketDisconnected)
    }

    onSocketConnected = (socket) => {
        this.onUserJoin(socket);
        socket.on('chat message', (msg) => this.onPlayerInput(msg, socket));
    }

    onSocketDisconnected = (socket) => {
        //this.server.to(socket.id).emit('chat message', "Bye");
    }

    onPlayerInput = (message, socket) => {
        const parsedMessage = this.handleInput(message, socket);
        this.server.to(parsedMessage.receiver).emit('chat message', parsedMessage.response);
    }

    onUserJoin = (socket) => {
        socket.join("main room"); // TODO: Have user join on Level0
        socket.emit('chat message', "Welcome to the backrooms. Use the command setPlayerName <name> to set your name.")
        //game.addPlayer(socket.id, socket.id);
      }

    addPlayer = (id, name) => {
        this.players.addPlayer(id, name);
    }

    isNewPlayer = (socket) => {
        return this.players.getPlayerName(socket.id);
    }

    handleInput = (input, socket) => {
        
        const command = this.parser.parseMessage(input, socket);
        if ( command.error ) { return command; }

        if(this.isNewPlayer(socket)) {
            this.outputMessage(this.isNewPlayer(socket), socket.id);
            return this.addNewPlayer(command, socket)
        }

        return command.action(command.description,socket, this.players);
    }

    addNewPlayer = (command, socket) => {
        if ( command.error ) { return command; } // command is already bad
        if(!this.parser.isCommandName("setplayername", command)){
            return {
                response: "Before you can be lost forever you must first set your name. User the command setPlayerName <name>.",
                receiver: socket.id,
                error: true
            }
        }
        const outcome = command.action(command.description, socket, this.players); // call command setPlayerName
        if(outcome.error){ return outcome; }

        //start game for user
        const player = this.players.getPlayer(socket.id);
        const currentLevel = Levels[player.location.level];
        const currentRoom = currentLevel.getRoom(player.location.room);

        return {
            response: currentRoom.description,
            receiver: player.id,
        }
    }

    outputMessage = (message, id) => {
        this.server.to(id).emit('chat message', message);
    }
}

module.exports = Game;
