import express from 'express'; 
import {
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    generateInvoice,
    getOrders, // Importing the getOrders function
    createOrder
} from '../controller/order.controller.js';

const router = express.Router();

// Define routes
router.post('/order', addOrder); // Add an order with detailed information
router.get('/order/:orderId', getOrderById); // Get a specific order by ID
router.put('/order/:orderId', updateOrder); // Update a specific order by ID
router.delete('/order/:orderId', deleteOrder); // Delete a specific order by ID
router.get('/user/:userId/orders', getOrdersByUser); // Get all orders for a specific user
router.get('/order/:orderId/invoice', generateInvoice); // Generate an invoice for a specific order

// Fetch all orders (for admin view, no userId required)
router.get('/orders', getOrders);

// Create a new order (for user side)
router.post('/orders', createOrder);

export default router;

