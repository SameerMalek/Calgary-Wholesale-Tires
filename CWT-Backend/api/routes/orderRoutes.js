import express from 'express';
import {
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUser,
    generateInvoice
} from '../controller/order.controller.js';

const router = express.Router();

// Define routes
router.post('/order', addOrder);
router.get('/order/:orderId', getOrderById);
router.put('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);
router.get('/user/:userId/orders', getOrdersByUser);
router.get('/order/:orderId/invoice', generateInvoice);

export default router;
