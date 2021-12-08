const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

require("./db/connection");
const PORT = process.env.PORT;

// middleware
// linked the router files to make our root

app.use(require("./router/auth"));

const middleWare = (req, res, next) => {
  console.log("hello mmiddleware");
};
middleWare();

app.get("/", (req, res) => {
  res.send("tha warldo kun desu");
});
app.get("/about", middleWare, (req, res) => {
  res.send("tha warldo kun about");
});
app.get("/contact", (req, res) => {
  res.send("tha warldo kun desu");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
