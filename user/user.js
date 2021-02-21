const Sequelize = require("sequelize");
const connect = require("../config/connect");

const User = connect.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//User.sync({ force: true });  // sempre remover quando iniciar a aplicação
module.exports = User;
