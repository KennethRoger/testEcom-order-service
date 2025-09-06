const orderRepo = require("../repositories/orderRepository");
const throwError = require("../utils/errorObject");
const HttpStatus = require("../utils/httpStatusCodes");

const createOrder = async (req, res, next) => {
  try {
    const productId = 0;
    const userId = req.user._id;
    if (!userId) return next(throwError(HttpStatus.BAD_REQUEST, "User ID is not found inisde user!"));
    const order = await orderRepo.create(userId, productId);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Order successfully created!",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await orderRepo.getOrderById(orderId);
    if (!order)
      return next(throwError(HttpStatus.NOT_FOUND, "Order not found!"));
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Order found!",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await orderRepo.getOrderById(orderId);
    if (!order)
      return next(throwError(HttpStatus.NOT_FOUND, "Order not found!"));

    order.status = "cancelled";
    await order.save();
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Order cancelled!",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderRepo.getAllOrders();
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Orders retrieved!",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!["pending", "shipped", "delivered", "cancelled"].includes(status))
      return next(
        throwError(HttpStatus.BAD_REQUEST, "Unidentified order status")
      );

    const order = await orderRepo.getOrderById(orderId);
    if (!order)
      return next(throwError(HttpStatus.NOT_FOUND, "Order not found!"));

    if (status === "cancelled")
      return next(
        throwError(
          HttpStatus.FORBIDDEN,
          "Unable to update the order status to cancelled!"
        )
      );

    if (order.status === "delivered" || order.status === "cancelled")
      return next(
        throwError(
          HttpStatus.FORBIDDEN,
          "Order is either cancelled or delivered!"
        )
      );
    order.status = status;
    await order.save();
    res.status(HttpStatus.OK).json({
      success: true,
      message: `Orders status updated to ${status}!`,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
