class Players{
  playerNames = {};

  setUsername(id, name) {
    this.playerNames[id] = name;
  }

  getUsername (id) {
    return this.playerNames[id] ?? "unknown";
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

module.exports = Players;