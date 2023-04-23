class Players{
  playerNames = {};

  addPlayer(id, name) {
    const newPlayer = new Player(id, name);
    this.playerNames[id] = newPlayer;
    return newPlayer;
  }

  getPlayer(id) {
    return this.playerNames[id];
  }

  doesPlayerExist(id){
    return !!this.playerNames[id];
  }

  getPlayerName (id) {
    return this.playerNames[id];
  }

  getId(name){
    for(var id in this.playerNames)
    {
      if(this.playerNames[id] == name){
        return id;
      }
    }
    return null;
  }
}

class Player{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.location = {
      level: 0,
      room: 0
    }
  }
}

module.exports = { Players, Player };