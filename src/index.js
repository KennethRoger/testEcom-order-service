const express = require("express");
require("dotenv").config();
const app = express();
const sequelize = require("./models/mysql/connectDB");

app.get("/", (req, res) => {
  res.send("<h1>Hello from order service</h1>");
});

const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established!");
    app.listen(PORT, (err) => {
      if (err) {
        console.error("Failed to listen to port ", PORT);
        return;
      }
      console.log("Listening to port ", PORT);
    });
  } catch (err) {
    console.error("Unable to connect to DB: ", err);
  }
})();
