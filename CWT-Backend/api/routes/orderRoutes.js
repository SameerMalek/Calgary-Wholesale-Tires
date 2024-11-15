import express from "express";
import {
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  generateInvoice,
  getOrders,
  getAllOrders,
  createOrder,
  applyDiscount,
} from "../controller/order.controller.js";

const router = express.Router();

// Define routes
router.post("/order", addOrder);
router.get("/order/:orderId", getOrderById);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);
router.get("/user/:userId/orders", getOrdersByUser); // For getting orders
router.get("/order/:orderId/invoice", generateInvoice);
router.get("/orders/:userId", getOrders);
router.post("/", createOrder);
router.post("/orders/:orderId/apply-discount", applyDiscount);
router.post("/:orderId/apply-discount", applyDiscount);
router.get("/all", getAllOrders);

export default router;
