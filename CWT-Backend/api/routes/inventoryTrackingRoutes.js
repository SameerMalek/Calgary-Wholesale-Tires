import express from 'express';
import {
  addInventoryTracking,
  getInventoryTrackingByProduct,
} from '../controller/inventoryTracking.controller.js';

const router = express.Router();

// Add inventory tracking record
router.post('/inventory-tracking', addInventoryTracking);

// Get all inventory tracking records by product
router.get('/product/:productId/inventory-tracking', getInventoryTrackingByProduct);

export default router;
