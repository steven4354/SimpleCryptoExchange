"use strict";

const Sequelize = require("sequelize");
const db = require("../index.js");

const User = db.define("users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  usd: {
    type: Sequelize.DECIMAL
  },
  bitcoinNum: {
    type: Sequelize.DECIMAL
  },
  litecoinNum: {
    type: Sequelize.DECIMAL
  },
  dogecoinNum: {
    type: Sequelize.DECIMAL
  },
  moneroNum: {
    type: Sequelize.DECIMAL
  }
});

module.exports = User;
