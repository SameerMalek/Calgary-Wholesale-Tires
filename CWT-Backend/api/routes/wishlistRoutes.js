import express from 'express';
import {
  addItemToWishlist,
  getWishlistItemsByUser,
  removeItemFromWishlist,
} from '../controller/wishlist.controller.js';
import { authenticateJWT } from '../lib/authenticateJWT.js';  // Import JWT authentication middleware

const router = express.Router();

// Add item to wishlist (Protected Route)
router.post('/wishlist', authenticateJWT, addItemToWishlist);

// Get all wishlist items by user (Protected Route)
router.get('/user/:userId/wishlist', authenticateJWT, getWishlistItemsByUser);

// Remove item from wishlist by ID (Protected Route)
router.delete('/wishlist/:wishlistId', authenticateJWT, removeItemFromWishlist);

export default router;


