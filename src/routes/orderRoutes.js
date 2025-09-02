const express = require("express");
const { createOrder, getOrderById, cancelOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.patch("/:id/cancel", cancelOrder);

// ADMIN ROUTES
router.get("/", getAllOrders);
router.post("/status/:id", updateOrderStatus);

module.exports = router;