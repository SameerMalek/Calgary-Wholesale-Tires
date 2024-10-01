import express from 'express';
import {
  addOrderItem,
  getOrderItemsByOrder,
} from '../controller/orderItem.controller.js';

const router = express.Router();

// Add order item
router.post('/order-item', addOrderItem);

// Get all order items by order
router.get('/order/:orderId/items', getOrderItemsByOrder);

export default router;
