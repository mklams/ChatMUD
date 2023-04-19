const userNames = {};

module.exports = {
    setUsername: function (id, name) {
      userNames[id] = name;
    },
    getUsername: function (id) {
      return userNames[id] ?? "unknown";
    },
    getId: function (name){
      for(var id in userNames)
      {
        if(userNames[id] == name){
          return id;
        }
      }
      return null;
    }
  };