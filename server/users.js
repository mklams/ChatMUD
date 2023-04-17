const userNames = {};

module.exports = {
    setUsername: function (id, name) {
      userNames[id] = name;
    },
    getUsername: function (id) {
      return userNames[id] ?? "unknown";
    }
  };