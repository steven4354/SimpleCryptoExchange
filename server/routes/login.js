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
      dogecoin: 0,
      moneroNum: 0
    }
  }).spread((user, created) => {
    if (created) {
      res.send(user);
    } else {
      res.send("username already in use");
    }

    /*
     findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:

    [ {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      },
      true ]

 In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
    */
  });
});

module.exports = router;
