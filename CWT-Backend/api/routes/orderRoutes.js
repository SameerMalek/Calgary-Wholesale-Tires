import express from "express";
import {
<<<<<<< HEAD
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    generateInvoice,
    getOrders,
    createOrder,
    applyDiscount
     
} from '../controller/order.controller.js';
=======
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  generateInvoice,
  getOrders,
  createOrder,
  applyDiscount,
} from "../controller/order.controller.js";
>>>>>>> 4aa9d45d87b2f9c9a1288a90388cd09613f2dd9a

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
<<<<<<< HEAD
router.post("/orders/:orderId/apply-discount", applyDiscount);



export default router; 
=======
router.post("/:orderId/apply-discount", applyDiscount);
export default router;
>>>>>>> 4aa9d45d87b2f9c9a1288a90388cd09613f2dd9a
