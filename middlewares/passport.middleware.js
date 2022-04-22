const LocalStrategy = require("passport-local");
const User = require("../models/user.model");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    try {
      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false, { message: "Wrong password" });
      }
    } catch (err) {
      done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    return done(null, await User.findOne({ email }));
  });
};

module.exports = initialize;
