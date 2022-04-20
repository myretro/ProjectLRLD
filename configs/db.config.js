const mongoose = require("mongoose");
require("dotenv").config();
var count = 0;

const DbOption = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, DbOption)
    .then((res) => {
      console.log(`Connected to db at ${uri}.`);
    })
    .catch((err) => {
      console.log(`Retrying after 5 sec.`, ++count);
      setTimeout(connectDB, 5000);
    });
};

try {
  connectDB(process.env.DB_URI);
} catch (err) {
  console.log("Unknown error has happened.");
}
