require("../configs/db.config");
const express = require("express");
const cors = require("cors");
const path = require("path");
const User = require("../models/user.model");

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
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//POST Routes
app.post("/", (req, res, next) => {});

app.post("/signin", (req, res, next) => {});

app.post("/signup", async (req, res, next) => {
  const { name, email, password, welcome_message } = req.body;
  if (!(name && email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for old users
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).json({ message: "User already exists." });
  } else {
    const user = new User({
      name,
      email,
      password,
      welcome_message,
    });

    await user.save();
    res.status(200).json({ data: user.email });
  }
});

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
