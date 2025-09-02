const Order = require("../models/mysql/order/model");

class OrderRepository {
  create(userId, productId) {
    return Order.create({ userId, productId });
  }

  getOrderById(orderId) {
    return Order.findByPk(orderId);
  }

  getAllOrders() {
    return Order.findAll();
  }
}

module.exports = new OrderRepository();