import express from 'express'; 
import {
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    generateInvoice,
    getOrders // Importing the new getOrders function
} from '../controller/order.controller.js';

const router = express.Router();

// Define routes
router.post('/order', addOrder);
router.get('/order/:orderId', getOrderById);
router.put('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);
router.get('/user/:userId/orders', getOrdersByUser);
router.get('/order/:orderId/invoice', generateInvoice);
router.get('/orders', getOrders); // Added route to fetch all orders

export default router;

