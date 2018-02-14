const db = require("../../db"); //this is required
const User = require("../../db/models/user");

const router = require("express").Router();

router.get("/:username", function(req, res, next) {
  User.findOrCreate({
    where: {username: req.params.username},
    defaults: {
      usd: 10000,
      bitcoinNum: 0,
      litecoinNum: 0,
      dogecoinNum: 0,
      moneroNum: 0
    }
  }).spread((user, created) => {
    res.send(user);
  });
});

module.exports = router;
