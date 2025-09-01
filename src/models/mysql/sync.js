const sequelize = require("./connectDB");

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Model synchornized with DB!");
  } catch (error) {
    console.error("Error syncing models: ", error);
  }
})();
