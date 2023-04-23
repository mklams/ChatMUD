const commands = require('./commands'); 

class CommandParser{
    parseMessage(msg, socket, players) {
        const [action, ...description] = msg.split(" ");
        if(!action){
            return {
                response: "Input must be of <action> <description>",
                receiver: socket.io
            }
        }
        const command = this.getCommand(action);

        if(command == null){
            return {
                response: "Invalid command",
                receiver: socket.io
            }
        }

        return command.action(description.join(" "),socket, players);
    }

    getCommand(name){
        for(const command of commands){
            if(command.names.includes(name.toLowerCase())){
                return command;
            }
        }
        return null;
    }
}

module.exports = CommandParser;