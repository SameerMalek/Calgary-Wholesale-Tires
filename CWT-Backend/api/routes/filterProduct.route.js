import express from 'express';
import {filterProducts } from '../controller/filterProduct.controller.js';

const router = express.Router();

// Filter products
router.get('/filter', filterProducts);

export default router;
