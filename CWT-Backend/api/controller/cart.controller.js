import prisma from '../lib/prisma.js';

// Add item to cart
export const addItemToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const cartItem = await prisma.cart.create({
      data: {
        user_id,
        product_id,
        quantity: parseInt(quantity, 10),
      },
    });
    res.status(201).json({ message: 'Item added to cart successfully', cartItem });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
};

// Get all cart items by user
export const getCartItemsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await prisma.cart.findMany({
      where: { user_id: userId },
      include: { product: true },
    });
    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart items', error: err.message });
  }
};

// Remove item from cart by ID
export const removeItemFromCart = async (req, res) => {
  const { cartId } = req.params;
  console.log("Cart ID received:", cartId);

  try {
    const deletedCartItem = await prisma.cart.delete({
      where: { id: cartId },
    });
    res.status(200).json({ message: 'Item removed from cart successfully', cartItem: deletedCartItem });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err.message });
  }
};
