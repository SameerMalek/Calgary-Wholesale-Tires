import express from "express";
import {
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  generateInvoice,
  applyDiscount,
  getOrders, // Importing the new getOrders function
  createOrder,
} from "../controller/order.controller.js";

const router = express.Router();

// Define routes
router.post("/order", addOrder);
router.get("/order/:orderId", getOrderById);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);
router.get("/user/:userId/orders", getOrdersByUser);
router.get("/order/:orderId/invoice", generateInvoice);
router.get("/orders/:userId", getOrders);
router.post("/", createOrder);
router.post("/orders/:orderId/apply-discount", applyDiscount);
export default router;
