const {Players, Player } = require('./players')
const {Level} = require('./level')

// TODO: Pass in args for action parameters

const setPlayerName = {
    names: ["setplayername","setname","sn"],
    action: (args) => {
        const  {details, socket, players} = args;
        if(players.getId(details)){
            return {
                error: true,
                response: "Name already taken.",
                receiver: socket.id
            }
        }
        players.addPlayer(socket.id, details);
        return {
            response: `Player ${details} has joined the backrooms.`,
            receiver: "main room"
        }

    }
}

const speak = {
    names: ["speak","talk","say","s"],
    action: (args) => {
        const  {details, socket, players} = args;
        const userName = players.getPlayerName(socket.id);
        return {
            response: userName + ": " + details,
            receiver: "main room"
        }
    }
}

const speakTo = {
    names: ["speakto","talkto","sayto"],
    action: (args) => {
        const  {details, socket, players} = args;
        const [receiverName, ...splitMessage] = details.split(" ");
        const userName = players.getPlayerName(socket.id);
        const receiverId = players.getId(receiverName);
        return {
            response: userName + ": (private)  " + splitMessage.join(" "),
            receiver: receiverId
        }
    }
}

const help = {
    names: ["help","?"],
    action: (args) => {
        const  {details, player} = args;
        return {
            response: "Enter a command in the form <action> <description>",
            receiver: player.id
        }
    }
}

const move = {
    names: ["move","m","go"],
    action: (args) => {
        const  {details, player, level} = args;
        const currentRoom = level.getRoomPlayerIsIn(player);

        // TODO: Move to own function
        // If only 1 connected room move the player to it
        if(currentRoom.connectedTo.length == 1){
            const nextRoomId = currentRoom.connectedTo[0];
            const nextRoom = level.getRoom(nextRoomId);
            // TODO: Commands should not handle moving the player
            player.setRoom(nextRoomId);
            
            return {
                response: nextRoom.description,
                receiver: player.id
            }
        }

        // handle commands with details
        const adjacentRoomNames = level.getRoomNames(currentRoom.connectedTo);
        const inputRoomName = details.toLowerCase();
        if(adjacentRoomNames.includes(inputRoomName)){
            const nextRoomId = level.getRoomId(inputRoomName);
            const nextRoom = level.getRoom(nextRoomId);
            // TODO: Commands should not handle moving the player
            player.setRoom(nextRoomId);

            return {
                response: nextRoom.description,
                receiver: player.id
            }
        }

        // invalid details
        return {
            response: `${details} is not a place to move.`,
            receiver: player.id
        }
    }
}

const look = {
    names: ["look","l","what"],
    action: (args) => {
        const  {details, player, level} = args;
        const room = level.getRoomPlayerIsIn(player);
        return {
            response: room.look,
            receiver: player.id
        }
    }
}

const where = {
    names: ["where","whereTo"],
    action: (args) => {
        const {details, player, level} = args;
        const currentRoom = level.getRoomPlayerIsIn(player);
        const adjacentRoomNames = level.getRoomNames(currentRoom.connectedTo);
        const output = adjacentRoomNames.join(" or ");

        return {
            response: `You could ~move~ to ${output}.`,
            receiver: player.id
        }
    }
}

const run = {
    names: ["run","r"],
    action: (args) => {
        const  {details, player, level} = args;
        const currentRoom = level.getRoomPlayerIsIn(player);
        const connectedRoomIds = currentRoom.connectedTo;
        const nextRoomId = connectedRoomIds[Math.floor(Math.random() * connectedRoomIds.length)];
        const nextRoom = level.getRoom(nextRoomId);
        // TODO: Commands should not handle moving the player
        player.setRoom(nextRoomId);
        return {
            response: nextRoom.description,
            receiver: player.id
        }
    }
}

const noclip = {
    names: ["noclip","nc","clip"],
    action: (args) => {
        const  {details, socket, player, level} = args;
        const currentRoom = level.getRoomPlayerIsIn(player);
        if(currentRoom.type == "noclip"){
            return {
                response: "You clip out of the room to the next level.",
                receiver: player.id
            }
        }
        return {
            response: "There's no where to clip here",
            receiver: player.id
        }
    }
}

const commands = [setPlayerName, speak, speakTo, help, move, look, where, run, noclip];

module.exports = commands;