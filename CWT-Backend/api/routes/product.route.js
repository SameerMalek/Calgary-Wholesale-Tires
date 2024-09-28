import express from 'express';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductsByCategory,
  getProductsBySubCategory,
} from '../controller/product.controller.js';

const router = express.Router();

// Add product
router.post('/product', addProduct);

// Delete product by ID
router.delete('/product/:productId', deleteProduct);

// Update product by ID
router.put('/product/:productId', updateProduct);

// Get product by ID
router.get('/product/:productId', getProductById);

// Get all products by category
router.get('/category/:categoryId/products', getProductsByCategory);

// Get all products by subcategory
router.get('/subcategory/:subCategoryId/products', getProductsBySubCategory);

export default router;
