const Sequelize = require("sequelize");
const connect = require("../config/connect");
const Category = require("../categories/Category");

const Article = connect.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); // uma categoria tem muitos artigos
Article.belongsTo(Category); // artigo pertence a caregoria

//Article.sync({ force: true }); // sempre remover quando iniciar a aplicação

module.exports = Article;
