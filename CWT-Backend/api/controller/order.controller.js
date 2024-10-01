import prisma from '../lib/prisma.js';

// Add a new order
export const addOrder = async (req, res) => {
  const { user_id, total_amount, shipping_address, billing_address, status, payment_status } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        user_id,
        total_amount: parseFloat(total_amount),
        shipping_address,
        billing_address,
        status: status || 'pending',
        payment_status: payment_status || 'pending',
      },
    });
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true }, // Include order items
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status, total_amount, shipping_address, billing_address, payment_status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        total_amount: parseFloat(total_amount),
        shipping_address,
        billing_address,
        payment_status,
      },
    });

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });
    res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
};

// Get all orders by user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: { orderItems: true },
    });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};
