require("../configs/db.config");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
// fixed : add ejs as template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
