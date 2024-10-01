import express from 'express';
import {
  addItemToCart,
  getCartItemsByUser,
  removeItemFromCart,
} from '../controller/cart.controller.js';

const router = express.Router();

// Add item to cart
router.post('/cart', addItemToCart);

// Get all cart items by user
router.get('/user/:userId/cart', getCartItemsByUser);

// Remove item from cart by ID
router.delete('/cart/:cartId', removeItemFromCart);

export default router;
