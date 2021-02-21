const Sequelize = require("sequelize");
const connect = require("../config/connect");

const Category = connect.define("categories", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//Category.sync({ force: true });  // sempre remover quando iniciar a aplicação
module.exports = Category;
