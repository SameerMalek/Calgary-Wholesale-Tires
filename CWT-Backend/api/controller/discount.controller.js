import prisma from '../lib/prisma.js';

// Add discount
export const addDiscount = async (req, res) => {
  const { user_id, product_id, discount_type, discount_value, start_date, end_date } = req.body;

  try {
    const discount = await prisma.discount.create({
      data: {
        user_id,
        product_id,
        discount_type,
        discount_value: parseFloat(discount_value),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });
    res.status(201).json({ message: 'Discount added successfully', discount });
  } catch (err) {
    res.status(500).json({ message: 'Error adding discount', error: err.message });
  }
};

// Get all discounts
export const getDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.discount.findMany();
    res.status(200).json({ discounts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching discounts', error: err.message });
  }
};

// Delete a discount by ID
export const deleteDiscount = async (req, res) => {
  const { discountId } = req.params;

  try {
    const deletedDiscount = await prisma.discount.delete({
      where: { id: discountId },
    });
    res.status(200).json({ message: 'Discount deleted successfully', discount: deletedDiscount });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting discount', error: err.message });
  }
};
