const level0 = require('./levels/level0')
const levelsJson = [level0];

class Level {
    rooms = new Map();
    roomNames = new Map(); // Name cache
    constructor(levelJson){
        this.level = JSON.parse(levelJson);
        for(const room of this.level.rooms){
            this.rooms.set(room.id, room);
            this.roomNames.set(room.id, room.name);
        }
    }

    getRoom = (roomId) => {
        return this.rooms.get(String(roomId));
    }

    getRoomPlayerIsIn = (player) => {
        return this.getRoom(player.location.room);
    }

    getRoomName = (roomId) => {
        return this.roomNames.get(roomId);
    }

    getRoomNames = (roomIds) => {
        return roomIds.map((roomId) => this.getRoomName(roomId))
    }

    getRoomId = (name) => {
        for(let [roomId,roomName] of this.roomNames){
          if(roomName == name){
            return roomId;
          }
        }
        return null;
      }
}

const Levels = levelsJson.map((levelJson) => {
    return new Level(levelJson);
})

module.exports = {Levels, Level};

