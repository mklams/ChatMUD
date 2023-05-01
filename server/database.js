const { createClient, SchemaFieldTypes } = require('redis');

class Database{
    database = null;

    // TODO: Make this a singleton
    async setupDatabase(){
        const database = createClient();
        database.on('error', err => console.log('Redis Client Error', err));
        await database.connect();
        this.database = database;
    }
    
    async addPlayerToDatabase(player){
        await this.database.hSet(`player-id:${player.name}`, {
            level: 0,
            room: 0
        })
    }
    
    async setPlayerLocation(player){
        await this.database.hSet(`player-id:${player.name}`, player.location)
    }
    
    async getPlayerLocationFromDatabase(player){
        return await this.database.hGetAll(`player-id:${player.name}`);
    }
    
    async doesPlayerExist(player){
        const location = await this.database.hGetAll(`player-id:${player.name}`);
        return Object.keys(location).length > 0;
    }
}


// TODO: Make database a class that encapsulates all this crap
module.exports = {Database};