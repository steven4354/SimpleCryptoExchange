const db = require("../../db"); //this is required
const User = require("../../db/models/user");

const router = require("express").Router();

router.get("/:username", function(req, res, next) {
  User.findOne({
    where: {username: req.params.username}
  }).then(user => {
    res.send(user);
  });
});

module.exports = router;
