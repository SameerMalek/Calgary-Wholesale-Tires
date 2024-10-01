import prisma from '../lib/prisma.js';

// Add a new order item
export const addOrderItem = async (req, res) => {
  const { order_id, product_id, quantity, price, discount } = req.body;

  try {
    const newOrderItem = await prisma.orderItem.create({
      data: {
        order_id,
        product_id,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        total_price: parseFloat(price) * parseInt(quantity, 10) - (discount ? parseFloat(discount) : 0),
      },
    });
    res.status(201).json({ message: 'Order item added successfully', orderItem: newOrderItem });
  } catch (err) {
    res.status(500).json({ message: 'Error adding order item', error: err.message });
  }
};

// Get all order items by order
export const getOrderItemsByOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: { order_id: orderId },
    });
    res.status(200).json({ orderItems });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order items', error: err.message });
  }
};
