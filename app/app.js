require("../configs/db.config");
const initialize = require("../middlewares/passport.middleware");
const express = require("express");
const cors = require("cors");
const path = require("path");
const User = require("../models/user.model");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET || "abhinav";

//adding middlewares
// fixed : add ejs as template engine
app.set("view engine", "ejs");
// fixed : working css in nodejs
app.use(express.static(path.normalize(__dirname + "/../views")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(passport.initialize());
initialize(passport);

//check if user is already auth
const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/fail");
};

//check if user is not auth
const checkNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/fail");
  }
  return next();
};

//GET Routes
app.get("/", checkNotAuth, (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//POST Routes
app.post("/", checkAuth, (req, res) => {
  console.log(req.body);
  res.redirect("/", {
    name: req.user.name,
  });
});

app.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.post("/fail", (req, res) => {
  res.status(500).json({ message: "Invalid Credentials" });
});

app.post("/signup", checkNotAuth, async (req, res) => {
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
