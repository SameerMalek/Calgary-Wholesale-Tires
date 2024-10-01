import express from 'express';
import {
  addProductManagement,
  getProductManagementByProduct,
} from '../controller/productManagement.controller.js';

const router = express.Router();

// Add product management record
router.post('/product-management', addProductManagement);

// Get product management records by product
router.get('/product/:productId/product-management', getProductManagementByProduct);

export default router;
