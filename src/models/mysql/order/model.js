const { DataTypes } = require("sequelize");
const sequelize = require("../connectDB");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("prnding", "shipped", "delivered", "cancelled"),
    defaultValue: "pending",
    allowNull: false,
  },
});

module.exports = Order;