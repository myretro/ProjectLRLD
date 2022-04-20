const { model, Schema } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  welcome_message: {
    type: String,
    default: "Hello",
  },
});

module.exports = model("User", User);
