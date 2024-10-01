import prisma from '../lib/prisma.js';

// Add a review
export const addReview = async (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        user_id,
        product_id,
        rating: parseInt(rating, 10),
        comment,
        is_approved: false, // Default to not approved
      },
    });
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', error: err.message });
  }
};

// Get all reviews by product
export const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { product_id: productId },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

// Approve or reject a review by ID
export const approveReview = async (req, res) => {
  const { reviewId } = req.params;
  const { is_approved } = req.body;

  try {
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { is_approved },
    });

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};
