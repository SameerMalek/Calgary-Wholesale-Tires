import express from 'express';
import {
  addReview,
  getReviewsByProduct,
  approveReview,
} from '../controller/review.controller.js';

const router = express.Router();

// Add review
router.post('/review', addReview);

// Get all reviews by product
router.get('/product/:productId/reviews', getReviewsByProduct);

// Approve or reject a review
router.put('/review/:reviewId/approve', approveReview);

export default router;
