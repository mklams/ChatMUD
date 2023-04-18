const commands = require('./commands'); 

module.exports = {
    parseMessage: function (msg, socket) {
        const words = msg.split(" ");
        if(words.length < 1){
            return {
                response: "Input must be of <action> <description>",
                receiver: socket.io
            }
        }
        const command = commands.getCommand(words[0]);

        if(command == null){
            return {
                response: "Invalid command",
                receiver: socket.io
            }
        }

        return command.action(words[1],socket);
    }
};