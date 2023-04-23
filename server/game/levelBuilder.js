const level0 = require('./levels/level0')
const levelsJson = [level0];

class Level {
    rooms = new Map();
    constructor(levelJson){
        this.level = JSON.parse(levelJson);
        for(const room of this.level.rooms){
            this.rooms.set(room.id, room);
        }
    }

    getRoom = (roomId) => {
        return this.rooms.get(String(roomId));
    }
}

const Levels = levelsJson.map((levelJson) => {
    return new Level(levelJson);
})

module.exports = Levels;

