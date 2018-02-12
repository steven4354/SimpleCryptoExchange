"use strict";

const Sequelize = require("sequelize");
const db = require("../index.js");

const User = db.define("users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  usd: {
    type: Sequelize.INTEGER
  },
  bitcoinNum: {
    type: Sequelize.INTEGER
  },
  litecoinNum: {
    type: Sequelize.INTEGER
  },
  dogecoinNum: {
    type: Sequelize.INTEGER
  },
  moneroNum: {
    type: Sequelize.INTEGER
  }
});

module.exports = User;
