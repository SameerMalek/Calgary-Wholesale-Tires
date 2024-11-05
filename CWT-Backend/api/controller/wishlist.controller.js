import prisma from '../lib/prisma.js';

// Add product to wishlist
// Use user_id from req.user if your middleware sets it
export const addItemToWishlist = async (req, res) => {
  const user_id = req.user.id;  // Assuming authenticateJWT middleware adds user details to req.user
  const { product_id } = req.body;

  try {
    const wishlistItem = await prisma.wishlist.create({
      data: {
        user_id,
        product_id,
      },
    });
    res.status(201).json({ message: 'Item added to wishlist successfully', wishlistItem });
  } catch (err) {
    console.error("Failed to add item to wishlist:", err);
    res.status(500).json({ message: 'Error adding item to wishlist', error: err.message });
  }
};


// Get all wishlist items by user
export const getWishlistItemsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlistItems = await prisma.wishlist.findMany({
      where: { user_id: userId },
      include: { product: true },
    });
    res.status(200).json({ wishlistItems });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist items', error: err.message });
  }
};

// Remove item from wishlist by ID
export const removeItemFromWishlist = async (req, res) => {
  const { wishlistId } = req.params;

  try {
    const deletedWishlistItem = await prisma.wishlist.delete({
      where: { id: wishlistId },
    });
    res.status(200).json({ message: 'Item removed from wishlist successfully', wishlistItem: deletedWishlistItem });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from wishlist', error: err.message });
  }
};
