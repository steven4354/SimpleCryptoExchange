const db = require("../../db"); //this is required
const Product = require("../../db/models/product");
const Review = require("../../db/models/review");
const User = require("../../db/models/user");
const fetch = require("node-fetch");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    console.log("body from the request object =>", req.body);
    let user = await User.findOne({
      where: {username: req.body.username}
    });

    //grabbing current prices of the coins
    let coinPrice;
    await fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        return json.filter(obj => {
          return obj.id == req.body.convertTo;
        });
      })
      .then(filtered => {
        console.log("coins data => ", filtered);
        coinPrice = filtered[0];
      });

    console.log("coin price => ", coinPrice);

    //checking to make sure the transaction is valid
    //then initiating it
    if (
      user[req.body.convertFrom] - parseInt(req.body.amountToConvertFrom) < 0 &&
      req.body.convertFrom == "usd"
    ) {
      res.send({
        message: "transaction not valid, would result in negative balance"
      });
    } else if (
      user[req.body.convertFrom + "Num"] -
        parseInt(req.body.amountToConvertFrom) <
        0 &&
      req.body.convertFrom == "bitcoin"
    ) {
      res.send({
        message: "transaction not valid, would result in negative balance"
      });
    } else if (req.body.convertFrom == "usd") {
      //debiting your balance for trade
      user[req.body.convertFrom] =
        user[req.body.convertFrom] - parseInt(req.body.amountToConvertFrom);
      await user.save();

      //crediting your balance from trade
      let coinNum = req.body.convertTo + "Num";
      user[coinNum] =
        parseFloat(user[coinNum]) +
        parseFloat(req.body.amountToConvertFrom) /
          parseFloat(coinPrice.price_usd);
      await user.save();
    } else if (req.body.convertFrom == "bitcoin") {
      //debiting your balance for trade
      let coinNum = req.body.convertFrom + "Num";
      user[coinNum] = user[coinNum] - parseInt(req.body.amountToConvertFrom);
      await user.save();

      //crediting your balance from trade
      coinNum = req.body.convertTo + "Num";
      user[coinNum] =
        parseFloat(user[coinNum]) +
        parseFloat(req.body.amountToConvertFrom) /
          parseFloat(coinPrice.price_btc);
      await user.save();
    }

    res.send(user);
  } catch (e) {
    console.log("error on trade route =>", e);
  }
});

module.exports = router;
