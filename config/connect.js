const Sequelize = require("sequelize");
const connect = new Sequelize("Blog", "10202408", "Escelsa!2080*", {
  host: "10.0.0.5",
  dialect: "mysql",
  timezone:"-03:00"
});

module.exports = connect;
