// import prisma from '../lib/prisma.js';

// // Add discount
// export const addDiscount = async (req, res) => {
//   const { user_id, product_id, discount_type, discount_value, start_date, end_date } = req.body;

//   try {
//     const discount = await prisma.discount.create({
//       data: {
//         user_id,
//         product_id,
//         discount_type,
//         discount_value: parseFloat(discount_value),
//         start_date: new Date(start_date),
//         end_date: new Date(end_date),
//       },
//     });
//     res.status(201).json({ message: 'Discount added successfully', discount });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding discount', error: err.message });
//   }
// };

// // Get all discounts
// export const getDiscounts = async (req, res) => {
//   try {
//     const discounts = await prisma.discount.findMany();
//     res.status(200).json({ discounts });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching discounts', error: err.message });
//   }
// };

// // Delete a discount by ID
// export const deleteDiscount = async (req, res) => {
//   const { discountId } = req.params;

//   try {
//     const deletedDiscount = await prisma.discount.delete({
//       where: { id: discountId },
//     });
//     res.status(200).json({ message: 'Discount deleted successfully', discount: deletedDiscount });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting discount', error: err.message });
//   }
// };

import prisma from "../lib/prisma.js";

// Add discount (optionally for a specific order)
export const addDiscount = async (req, res) => {
  const {
    user_id,
    product_id,
    discount_type,
    discount_value,
    start_date,
    end_date,
    order_id,
  } = req.body;

  console.log("Received discount data:", req.body);

  try {
    const discount = await prisma.discount.create({
      data: {
        user_id,
        product_id,
        discount_type,
        discount_value: parseFloat(discount_value),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        order_id,
      },
    });
    res.status(201).json({ message: "Discount added successfully", discount });
  } catch (err) {
    console.error("Error adding discount:", err);
    res
      .status(500)
      .json({ message: "Error adding discount", error: err.message });
  }
};

// Get all discounts
export const getDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.discount.findMany({
      include: { order: true, product: true, user: true },
    });
    res.status(200).json({ discounts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching discounts", error: err.message });
  }
};

// Update a discount by ID (to edit a discount for a specific order)
export const updateDiscount = async (req, res) => {
  const { discountId } = req.params;
  const { discount_value, start_date, end_date } = req.body;

  try {
    const updatedDiscount = await prisma.discount.update({
      where: { id: discountId },
      data: {
        discount_value: discount_value ? parseFloat(discount_value) : undefined,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined,
      },
    });
    res.status(200).json({
      message: "Discount updated successfully",
      discount: updatedDiscount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating discount", error: err.message });
  }
};

// Delete a discount by ID
export const deleteDiscount = async (req, res) => {
  const { discountId } = req.params;

  try {
    const deletedDiscount = await prisma.discount.delete({
      where: { id: discountId },
    });
    res.status(200).json({
      message: "Discount deleted successfully",
      discount: deletedDiscount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting discount", error: err.message });
  }
};
