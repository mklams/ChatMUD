const {Players, Player } = require('./game/players')

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
    action: (dargs) => {
        const  {details, socket, players} = args;
        return {
            response: "Enter a command in the form <action> <description>",
            receiver: socket.id
        }
    }
}

const move = {
    names: ["move","m","go"],
    action: (args) => {
        // TODO: parse details and move actor
        const  {details, socket, players} = args;
        return {
            response: "You moved",
            receiver: socket.id
        }
    }
}

const look = {
    names: ["look","l","what"],
    action: (args) => {
        const  {details, socket, players} = args;
        return {
            response: "Nothing to see here",
            receiver: socket.id
        }
    }
}

const run = {
    names: ["run","r"],
    action: (dargs) => {
        const  {details, socket, players} = args;
        return {
            response: "Run away!",
            receiver: socket.id
        }
    }
}

const noclip = {
    names: ["noclip","nc","clip"],
    action: (args) => {
        const  {details, socket, players} = args;
        return {
            response: "There's no where to clip here",
            receiver: socket.id
        }
    }
}

const commands = [setPlayerName, speak, speakTo, help, move, look, run, noclip];

module.exports = commands;