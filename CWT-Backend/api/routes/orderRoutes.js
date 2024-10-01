import express from 'express';
import {
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderById,
  getOrdersByUser,
} from '../controller/order.controller.js';

const router = express.Router();

// Add order
router.post('/order', addOrder);

// Delete order by ID
router.delete('/order/:orderId', deleteOrder);

// Update order by ID
router.put('/order/:orderId', updateOrder);

// Get order by ID
router.get('/order/:orderId', getOrderById);

// Get all orders by user
router.get('/user/:userId/orders', getOrdersByUser);

export default router;
