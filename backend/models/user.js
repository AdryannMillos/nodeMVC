const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
      },
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
      },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    //   len: [6, 12],
    },
  },
});

module.exports = User;
