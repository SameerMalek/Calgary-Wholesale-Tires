// import express from 'express';
// import {
//   addDiscount,
//   getDiscounts,
//   deleteDiscount,
// } from '../controller/discount.controller.js';

// const router = express.Router();

// // Add discount
// router.post('/discount', addDiscount);

// // Get all discounts
// router.get('/discounts', getDiscounts);

// // Delete a discount by ID
// router.delete('/discount/:discountId', deleteDiscount);

// export default router;

import express from "express";
import {
  addDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} from "../controller/discount.controller.js";

const router = express.Router();

// Add discount
router.post("/discount", addDiscount);

// Get all discounts
router.get("/discounts", getDiscounts);

// Update a discount by ID
router.put("/discount/:discountId", updateDiscount); // New route

// Delete a discount by ID
router.delete("/discount/:discountId", deleteDiscount);

export default router;
