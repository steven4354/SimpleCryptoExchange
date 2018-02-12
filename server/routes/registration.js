const db = require("../../db"); //this is required
const User = require("../../db/models/user");

const router = require("express").Router();

router.get("/:username", function(req, res, next) {
  User.findAll({
    where: {
      authorId: 2
    }
  }).then();
  Product.findAll({
    include: [Review]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

router.get("/:id", function(req, res, next) {
  Product.findOne({
    where: {id: req.params.id},
    include: [Review]
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

module.exports = router;
