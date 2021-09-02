const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: console.log,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.todoLists = require("./todoList.model")(sequelize, Sequelize);

db.users.hasMany(db.todoLists, {
  as: "todoLists",
  onDelete: "cascade",
});

db.todoLists.belongsTo(db.users, {
  as: "users",
  foreignKey:"UserId"
});

module.exports = db;
