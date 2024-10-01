import prisma from '../lib/prisma.js';

// Add a new inventory tracking record
export const addInventoryTracking = async (req, res) => {
  const { product_id, change_quantity, location, updated_by } = req.body;

  try {
    const inventoryTracking = await prisma.inventoryTracking.create({
      data: {
        product_id,
        change_quantity: parseInt(change_quantity, 10),
        location,
        updated_by,
      },
    });
    res.status(201).json({ message: 'Inventory tracking record added successfully', inventoryTracking });
  } catch (err) {
    res.status(500).json({ message: 'Error adding inventory tracking record', error: err.message });
  }
};

// Get all inventory tracking records by product
export const getInventoryTrackingByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const inventoryTrackingRecords = await prisma.inventoryTracking.findMany({
      where: { product_id: productId },
    });
    res.status(200).json({ inventoryTrackingRecords });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory tracking records', error: err.message });
  }
};
