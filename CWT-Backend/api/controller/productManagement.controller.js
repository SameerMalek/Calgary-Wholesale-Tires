import prisma from '../lib/prisma.js';

// Add a new product management record
export const addProductManagement = async (req, res) => {
  const { product_id, admin_id, action, description } = req.body;

  try {
    const productManagement = await prisma.productManagement.create({
      data: {
        product_id,
        admin_id,
        action,
        description,
        change_date: new Date(),
      },
    });
    res.status(201).json({ message: 'Product management record added successfully', productManagement });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product management record', error: err.message });
  }
};

// Get product management records by product
export const getProductManagementByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const productManagementRecords = await prisma.productManagement.findMany({
      where: { product_id: productId },
    });
    res.status(200).json({ productManagementRecords });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product management records', error: err.message });
  }
};
