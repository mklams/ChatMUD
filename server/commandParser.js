const users = require('./users'); 

module.exports = {
    parseMessage: function (msg, socket) {
        const words = msg.split(" ");
        if(words.length > 1){
            if(words[0] === "setUsername"){
                const newUsername = words[1];
                users.setUsername(socket.id, newUsername);
                return `User ${socket.id} is now ${newUsername}`;  
            }
        }
        const userName = users.getUsername(socket.id);
        return userName + ": " + msg; 
    }
};