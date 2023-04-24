const { Players, Player } = require('./players');
const CommandParser = require('../commandParser');
const Levels = require('./levelBuilder');

class Game{
    constructor(server) {
        this.players = new Players();
        this.parser = new CommandParser();
        this.server = server;
        this.server.on('connection', this.onSocketConnected);
        this.server.on('disconnection', this.onSocketDisconnected);
        this.levels = Levels;
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
        socket.emit('chat message', "You decided to come here? That was an unfortunate decision. Well, what's your name? (Use the command setPlayerName <your name> to set your name.)")
    }

    addPlayer = (id, name) => {
        this.players.addPlayer(id, name);
    }

    isNewPlayer = (socket) => {
        return !this.players.doesPlayerExist(socket.id);
    }

    handleInput = (input, socket) => {
        
        const command = this.parser.parseMessage(input, socket);
        if ( command.error ) { return command; }

        if(this.isNewPlayer(socket)) {
            
            return this.addNewPlayer(command, socket)
        }
        const player = this.players.getPlayer(socket.id);
        const playerRoom = this.getPlayersRoom(player);
        return command.action({details: command.description, socket: socket, players: this.players, room: playerRoom});
    }

    addNewPlayer = (command, socket) => {
        if ( command.error ) { return command; } // command is already bad
        if(!this.parser.isCommandName("setplayername", command)){
            return {
                response: "I need to know your name so I can forget you once you're lost. (Use the command setPlayerName <your name>.)",
                receiver: socket.id,
                error: true
            }
        }

        const outcome = command.action({details: command.description, socket: socket, players: this.players}); // call command setPlayerName
        if(outcome.error){ return outcome; }

        //start game for user
        const player = this.players.getPlayer(socket.id);
        this.outputMessage(`Welcome ${player.name} to Level 0! You can stay in this unpleasant level or try to find a room you can ~noclip~ in.`, player.id)
        
        const playerRoom = this.getPlayersRoom(player);
        socket.join("level0"); // TODO: have user join based on actual level
        
        return {
            response: playerRoom.description,
            receiver: player.id,
        }
    }

    getPlayersRoom = (player) => {
        const currentLevel = Levels[player.location.level];
        return currentLevel.getRoom(player.location.room);
    }

    outputMessage = (message, id) => {
        this.server.to(id).emit('chat message', message);
    }
}

module.exports = Game;
