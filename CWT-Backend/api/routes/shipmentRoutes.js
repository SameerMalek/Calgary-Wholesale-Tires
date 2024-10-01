import express from 'express';
import {
  addShipment,
  getShipmentsByOrder,
  updateShipmentStatus,
} from '../controller/shipment.controller.js';

const router = express.Router();

// Add shipment
router.post('/shipment', addShipment);

// Get all shipments by order
router.get('/order/:orderId/shipments', getShipmentsByOrder);

// Update shipment status
router.put('/shipment/:shipmentId/status', updateShipmentStatus);

export default router;
