'use strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('users', {
  username: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
});

module.exports = User;
