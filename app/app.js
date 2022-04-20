require("../configs/db.config");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

//adding middlewares
// fixed : add ejs as template engine
app.set("view engine", "ejs");
// fixed : working css in nodejs
app.use(express.static(path.normalize(__dirname + "/../views")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("register");
});

//POST Routes
app.post("/", (req, res, next) => {});

app.post("/signin", (req, res, next) => {});

app.post("/signup", (req, res, next) => {});

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
