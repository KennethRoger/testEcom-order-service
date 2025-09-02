require("dotenv").config();

const express = require("express");
const app = express();

const sequelize = require("./models/mysql/connectDB");

const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.get("/", (req, res) => {
  res.send("<h1>Hello from order service</h1>");
});

const PORT = process.env.PORT;

app.use("/order", orderRoutes);
app.use(errorHandler);

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
