import express from 'express';
import {
  addSalesReport,
  getSalesReports,
  getSalesReportById,
} from '../controller/salesReport.controller.js';

const router = express.Router();

// Add sales report
router.post('/sales-report', addSalesReport);

// Get all sales reports
router.get('/sales-reports', getSalesReports);

// Get sales report by ID
router.get('/sales-report/:reportId', getSalesReportById);

export default router;
