const {Events} = require('./events');
const { Players, Player } = require('./players');
const CommandParser = require('./commandParser');
const {Levels, Level} = require('./level');

class Game{
    constructor(server, database) {
        this.activePlayers = new Players();
        this.parser = new CommandParser();
        this.server = server;
        this.database = database;
        this.server.on('connection', this.onSocketConnected);
        this.server.on('disconnection', this.onSocketDisconnected);
        this.levels = Levels;
    }

    onSocketConnected = (socket) => {
        this.onUserJoin(socket);
        socket.on(Events.chatMessage, (msg) => this.onPlayerInput(msg, socket));
    }

    onSocketDisconnected = (socket) => {
        this.activePlayers.removePlayer(socket.id);
    }

    // TODO: Client does not wait on result which could lead to race conditions
    onPlayerInput = async (message, socket) => {
        const output = await this.handleInput(message, socket);
        if(output.moveTo){
            this.movePlayerToRoom(output.moveTo, socket);
        }
        this.server.to(output.receiver).emit(output.event, output.response);
    }

    movePlayerToRoom = async (roomId, socket) => {
        const player = this.activePlayers.getPlayer(socket.id);
        player.setRoom(roomId);
        const room = this.getPlayersRoom(player);
        await this.database.setPlayerLocation(player);
        socket.emit(Events.newRoom,room.imgUrl);
    }

    onUserJoin = (socket) => {
        socket.emit(Events.chatMessage, "You decided to come here? That was an unfortunate decision. Well, what's your name? (Use the command setPlayerName <your name> to set your name.)")
    }

    addPlayer = (id, name) => {
        this.activePlayers.addPlayer(id, name);
    }

    isNewPlayer = (socket) => {
        return !this.activePlayers.doesPlayerExist(socket.id);
    }

    handleInput = async (input, socket) => {
        
        const command = this.parser.parseMessage(input, socket);
        if ( command.error ) { return command; }

        if(this.isNewPlayer(socket)) {       
            return await this.addNewPlayer(command, socket)
        }
        const player = this.activePlayers.getPlayer(socket.id);
        
        const playerLevel = this.getLevelPlayerIsOn(player);
        return command.action({details: command.description, socket: socket, player: player, players: this.activePlayers, level: playerLevel});
    }

    addNewPlayer = async (command, socket) => {
        if ( command.error ) { return command; } // command is already bad
        if(!this.parser.isCommandName("setplayername", command)){ // TODO: indirect coupling to command name
            return {
                response: "I need to know your name so I can forget you once you're lost. Use the command setPlayerName <your name>.",
                receiver: socket.id,
                event: Events.chatMessage,
                error: true
            }
        }

        const outcome = command.action({details: command.description, socket: socket, players: this.activePlayers}); // call command setPlayerName
        if(outcome.error){ return outcome; }

        const player = this.activePlayers.getPlayer(socket.id);
        const existingPlayer = await this.database.doesPlayerExist(player);
        if(!existingPlayer){
            await this.database.addPlayerToDatabase(player);
        }
        const savedPlayerLocation = await this.database.getPlayerLocationFromDatabase(player);
        player.location = savedPlayerLocation;
        await this.database.setPlayerLocation(player);

        //start game for user
        // TODO: Identify new users and give them a welcome message
       // this.outputMessage(`Welcome ${player.name} to Level 0! You can stay in this unpleasant level or try to find a room you can ~noclip~ in.`, player.id)
        
        const playerRoom = this.getPlayersRoom(player);
        socket.join(`level:${player.location.level}`); // TODO: have user join based on actual level
        
        return {
            response: playerRoom.description,
            receiver: player.id,
            event:Events.chatMessage,
            moveTo: playerRoom.id
        }
    }

    getPlayersRoom = (player) => {
        const playerLevel = this.getLevelPlayerIsOn(player);
        return playerLevel.getRoomPlayerIsIn(player);
    }

    getLevelPlayerIsOn = (player) => {
        return Levels[player.location.level];
    }

    outputMessage = (message, id) => {
        this.server.to(id).emit('chat message', message);
    }
}

module.exports = Game;
