const Players = require('./players');

class Game{
    constructor() {
        this.players = new Players();
    }

    addPlayer(id, name){
        this.players.setUsername(id, name);
    }
}

module.exports = Game;
