import prisma from '../lib/prisma.js';

// Add a new shipment
export const addShipment = async (req, res) => {
  const { order_id, tracking_number, carrier, status, estimated_delivery, shipping_cost } = req.body;

  try {
    const shipment = await prisma.shipment.create({
      data: {
        order_id,
        tracking_number,
        carrier,
        status: status || 'processing', // Default status is processing
        estimated_delivery: new Date(estimated_delivery),
        shipping_cost: parseFloat(shipping_cost),
      },
    });
    res.status(201).json({ message: 'Shipment added successfully', shipment });
  } catch (err) {
    res.status(500).json({ message: 'Error adding shipment', error: err.message });
  }
};

// Get all shipments by order ID
export const getShipmentsByOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const shipments = await prisma.shipment.findMany({
      where: { order_id: orderId },
    });
    res.status(200).json({ shipments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching shipments', error: err.message });
  }
};

// Update shipment status
export const updateShipmentStatus = async (req, res) => {
  const { shipmentId } = req.params;
  const { status, actual_delivery } = req.body;

  try {
    const updatedShipment = await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        status,
        actual_delivery: actual_delivery ? new Date(actual_delivery) : null,
      },
    });
    res.status(200).json({ message: 'Shipment updated successfully', shipment: updatedShipment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating shipment', error: err.message });
  }
};
