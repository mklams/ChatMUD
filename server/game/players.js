class Players{
  players = {};

  addPlayer(id, name) {
    const newPlayer = new Player(id, name);
    this.players[id] = newPlayer;
    return newPlayer;
  }

  getPlayer(id) {
    return this.players[id];
  }

  removePlayer(id){
    this.players[id] = null;
  }

  doesPlayerExist(id){
    return !!this.players[id];
  }

  getPlayerName (id) {
    return this.players[id];
  }

  getId(name){
    for(var id in this.players)
    {
      if(this.players[id] == name){
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

  setRoom(roomId){
    this.location.room = roomId;
  }

  setLevel(levelId){
    this.location.level = levelId;
  }
}

module.exports = { Players, Player };