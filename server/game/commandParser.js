const commands = require('./commands'); 
const {Events} = require('./events');

class CommandParser{
    parseMessage(msg, socket) {
        const [action, ...description] = msg.split(" ");
        if(!action){
            return {
                response: "Input must be of <action> <description>",
                receiver: socket.id,
                event: Events.chatMessage,
                error: true
            }
        }
        const command = this.getCommand(action);

        if(command == null){
            return {
                response: "Invalid command",
                receiver: socket.id,
                event: Events.chatMessage,
                error: true
            }
        }

        command.description = description.join(" ");

        return command;
    }

    isCommandName(commandName, command){
        return command.names.includes(commandName);
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