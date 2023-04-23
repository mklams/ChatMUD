const Players = require('./players');
const CommandParser = require('../commandParser');

class Game{
    constructor() {
        this.players = new Players();
        this.parser = new CommandParser();
    }

    addPlayer(id, name){
        this.players.setUsername(id, name);
    }

    handleInput(input, socket){
        return this.parser.parseMessage(input, socket, this.players);
    }
}

module.exports = Game;
