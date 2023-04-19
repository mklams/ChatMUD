const users = require('./users'); 

const setUsername = {
    names: ["setusername","setname"],
    action: (details, socket) => {
        users.setUsername(socket.id, details);
        return {
            response: `User ${socket.id} is now ${details}`,
            receiver: "main room"
        }

    }
}

const speak = {
    names: ["speak","talk","say"],
    action: (details, socket) => {
        const userName = users.getUsername(socket.id);
        return {
            response: userName + ": " + details,
            receiver: "main room"
        }
    }
}

const speakTo = {
    names: ["speakto","talkto","sayto"],
    action: (details, socket) => {
        const [receiverName, ...splitMessage] = details.split(" ");
        const userName = users.getUsername(socket.id);
        const receiverId = users.getId(receiverName);
        return {
            response: userName + ": (private)  " + splitMessage.join(" "),
            receiver: receiverId
        }
    }
}

const help = {
    names: ["help","?"],
    action: (details, socket) => {
        return {
            response: "Enter a command in the form <action> <description>",
            receiver: socket.id
        }
    }
}

const commands = [setUsername, speak, speakTo, help];

module.exports ={
    getCommand: function(name){
        for(const command of commands){
            if(command.names.includes(name.toLowerCase())){
                return command;
            }
        }
        return null;
    }
}