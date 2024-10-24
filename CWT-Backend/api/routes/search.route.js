import express from "express";
import { searchProducts } from "../../api/controller/search.products.controller.js";

const router = express.Router();

// Search Products
router.get("/search", searchProducts);

export default router;
