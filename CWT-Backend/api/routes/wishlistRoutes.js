import express from 'express';
import {
  addItemToWishlist,
  getWishlistItemsByUser,
  removeItemFromWishlist,
} from '../controller/wishlist.controller.js';

const router = express.Router();

// Add item to wishlist
router.post('/wishlist', addItemToWishlist);

// Get all wishlist items by user
router.get('/user/:userId/wishlist', getWishlistItemsByUser);

// Remove item from wishlist by ID
router.delete('/wishlist/:wishlistId', removeItemFromWishlist);

export default router;
