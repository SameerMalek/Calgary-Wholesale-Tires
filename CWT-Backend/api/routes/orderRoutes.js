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
router.post("/orders/:orderId/apply-discount", applyDiscount); // Removed duplicate
router.get("/all", getAllOrders); // Cleaned up conflicting route

export default router;

// import express from "express";
// import {
//   addOrder,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   getOrdersByUser,
//   generateInvoice,
//   getOrders,
//   getAllOrders,
//   createOrder,
//   applyDiscount,
// } from "../controller/order.controller.js";

// const router = express.Router();

// // Define routes

// // Create a new order
// router.post("/", createOrder);  // This is the main endpoint to create orders

// // Additional endpoint to add an order, if it differs from the main createOrder function
// router.post("/order", addOrder);  

// // Fetch specific order by ID
// router.get("/order/:orderId", getOrderById);

// // Update order by ID
// router.put("/order/:orderId", updateOrder);  // Updated to keep one single route for updating an order

// // Delete an order by ID
// router.delete("/order/:orderId", deleteOrder);

// // Get orders by user ID
// router.get("/user/:userId/orders", getOrdersByUser);

// // Generate an invoice for a specific order
// router.get("/order/:orderId/invoice", generateInvoice);

// // Get all orders with relations (for admin view)
// router.get("/orders", getOrders);  // More intuitive to access all orders at `/orders` instead of `/orders/:userId`

// // Apply a discount to a specific order by ID
// router.post("/order/:orderId/apply-discount", applyDiscount);  // Keep a single consistent endpoint for applying discount

// // Get all orders grouped by status (for order management)
// router.get("/all", getAllOrders);

// export default router;


