const commands = require('./commands'); 

module.exports = {
    parseMessage: function (msg, socket) {
        const [action, ...description] = msg.split(" ");
        if(!action){
            return {
                response: "Input must be of <action> <description>",
                receiver: socket.io
            }
        }
        const command = commands.getCommand(action);

        if(command == null){
            return {
                response: "Invalid command",
                receiver: socket.io
            }
        }

        return command.action(description.join(" "),socket);
    }
};