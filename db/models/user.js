'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  username: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  usd: {
    type: Sequelize.INTEGER,
  },
  bitcoinNum: {
  	type: Sequelize.INTEGER,
  },
  LitecoinNum: {
  	type: Sequelize.INTEGER,
  },
  DogecoinNum: {
    type: Sequelize.INTEGER,
  },
  MoneroNum: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;
