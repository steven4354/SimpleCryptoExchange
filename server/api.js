const api = (module.exports = require("express").Router());
const products = require("./routes/products");
const reviews = require("./routes/reviews");
const userinfo = require("./routes/reviews");
const register = require("./routes/register");
const login = require("./routes/login");

// import products from './products';
api
  .get("/express-test", (req, res) => res.send({express: "working!"})) //demo route to prove api is working
  .use("/products", products)
  .use("/reviews", reviews)
  .use("/register", register)
  .use("/login", login);
// No routes matched? 404.
api.use((req, res) => res.status(404).end());
