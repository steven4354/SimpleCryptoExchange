const db = require("../../db"); //this is required
const User = require("../../db/models/user");

const router = require("express").Router();

router.get("/:username", function(req, res, next) {
  User.findOrCreate({
    where: {username: req.params.username}
  }).spread((user, created) => {
    if (created) {
      res.send(user);
    } else {
      res.send("username already in use");
    }
  });
});

module.exports = router;
