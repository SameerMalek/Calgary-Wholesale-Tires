import prisma from "../lib/prisma.js";
import easyinvoice from "easyinvoice";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Order Controller
export const createOrder = async (req, res) => {
  const { user_id, items, shipping_address, billing_address, total_amount } =
    req.body;

  console.log("Items received:", items);
  console.log("Items type:", typeof items);
  console.log("Is items an array?", Array.isArray(items));

  // Add validation checks
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Invalid or empty order items",
      receivedItems: items,
    });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_amount * 100), // amount in cents
      currency: "cad",
      payment_method_types: ["card"],
    });

    const newOrder = await prisma.order.create({
      data: {
        user_id,
        total_amount: parseFloat(total_amount),
        shipping_address,
        billing_address,
        status: "pending",
        payment_status: "pending",
        orderItems: {
          create: items.map((item) => ({
            product_id: item.productId || item.product_id,
            quantity: item.quantity,
            price: item.price,
            total_price: item.price * item.quantity,
          })),
        },
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      paymentIntent,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
};

// Add a new order
export const addOrder = async (req, res) => {
  const {
    user_id,
    total_amount,
    shipping_address,
    billing_address,
    status,
    payment_status,
  } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        user_id,
        total_amount: parseFloat(total_amount),
        shipping_address,
        billing_address: JSON.stringify(billing_address),
        status: "pending",
        payment_status: payment_status || "pending",
      },
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: `Error creating order: ${err.message}` });
  }
};

// Fetch all orders and group them by status
export const getAllOrders = async (req, res) => {
  try {
    const ordersWithRelations = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const groupedOrders = {
      newOrders: ordersWithRelations.filter(
        (order) => order.status.toLowerCase() === "pending"
      ),
      preparing: ordersWithRelations.filter(
        (order) => order.status.toLowerCase() === "preparing"
      ),
      readyForDelivery: ordersWithRelations.filter(
        (order) => order.status.toLowerCase() === "ready for delivery"
      ),
      completed: ordersWithRelations.filter(
        (order) => order.status.toLowerCase() === "completed"
      ),
    };

    res.status(200).json(groupedOrders);
  } catch (err) {
    console.error("Error fetching all orders:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching all orders", error: err.message });
  }
};

// Fetch orders for admin
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Fetch all orders by user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const ordersWithNullableFieldsHandled = orders.map((order) => ({
      ...order,
      orderItems: order.orderItems.map((item) => ({
        ...item,
        product: item.product || "Product no longer available",
      })),
    }));

    res.status(200).json({ orders: ordersWithNullableFieldsHandled });
  } catch (err) {
    console.error("Error fetching orders for user:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: err.message });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  const { orderId } = req.params; // Extract order ID from route params
  const { status } = req.body; // Extract the new status from the request body

  try {
    // Validate the status
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    // Check if the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Update the order's status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    // Respond with the updated order details
    return res
      .status(200)
      .json({ message: "Order updated successfully.", order: updatedOrder });
  } catch (err) {
    console.error("Error updating order:", err.message);
    return res.status(500).json({
      message: "Failed to update order status.",
      error: err.message,
    });
  }
};

// export const updateOrder = async (req, res) => {
//   const { orderId } = req.params;
//   const { status, shipping_address, billing_address } = req.body;

//   try {
//     // Define update data for the delivery status
//     const updateData = {
//       ...(status && { status }),
//       ...(shipping_address && { shipping_address }),
//       ...(billing_address && { billing_address }),
//     };

//     // Ensure `orderId` exists in the database
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//     });

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Update the order with new status or address details
//     const updatedOrder = await prisma.order.update({
//       where: { id: orderId },
//       data: updateData,
//     });

//     res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
//   } catch (err) {
//     console.error("Error updating order:", err.message);
//     res.status(500).json({ message: "Error updating order", error: err.message });
//   }
// };

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params; // Extract orderId from the route params

  try {
    console.log("Received Order ID to delete:", orderId);

    // Fetch the order details
    const order = await prisma.order.findUnique({
      where: { id: orderId }, // Corrected field name
      include: { orderItems: true }, // Include related items
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Fetched Order Details:", order);

    // Handle refund if payment was completed
    if (order.payment_status === "completed" && !order.stripePaymentId) {
      if (!order.stripePaymentId) {
        return res.status(400).json({
          message: "Cannot process refund. Stripe Payment ID is missing.",
        });
      }

      try {
        // Refund the payment using Stripe
        const refund = await stripe.refunds.create({
          payment_intent: order.stripePaymentId,
        });
        console.log("Refund Response:", refund);
        console.log(`Refund successful for Order ID: ${orderId}`);
      } catch (refundError) {
        console.error("Refund Error:", {
          message: refundError.message,
          stack: refundError.stack,
          raw: refundError,
        });
        return res.status(500).json({
          message: "Failed to process payment refund.",
          error: refundError.message,
        });
      }
    }

    // Delete associated order items
    await prisma.orderItem.deleteMany({
      where: { order_id: orderId }, // Ensure this matches the foreign key in your schema
    });

    // Delete the order itself
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId }, // Correct field for primary key
    });

    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    console.error("Error deleting order:", err.message || err);
    res.status(500).json({
      message: "Error deleting order",
      error: err.message || "Internal Server Error",
    });
  }
};

// Apply Discount to an order
export const applyDiscount = async (req, res) => {
  const { orderId } = req.params;
  const { discount_type, discount_value } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let discountedAmount = order.total_amount;
    if (discount_type === "percentage") {
      discountedAmount = order.total_amount * ((100 - discount_value) / 100);
    } else if (discount_type === "fixed") {
      discountedAmount = order.total_amount - discount_value;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { total_amount: discountedAmount },
    });

    res
      .status(200)
      .json({ message: "Discount applied successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error applying discount:", error.message);
    res.status(500).json({ message: "Failed to apply discount" });
  }
};

// Generate invoice for an order
export const generateInvoice = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch order with detailed product data
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: true, // Assuming your database has a relation to fetch product details
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const products = order.orderItems.map((item) => ({
      quantity: item.quantity,
      description: item.product?.name || "Product no longer available",
      "tax-rate": 5, // Adjust tax rate based on your logic
      price: item.price,
    }));

    const shippingFee = {
      quantity: 1,
      description: "Shipping Fees",
      "tax-rate": 5,
      price: 25.0, // Replace with dynamic value if available
    };

    const invoiceData = {
      documentTitle: "Invoice",
      currency: "CAD",
      taxNotation: "GST",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      sender: {
        company: "Calgary Wholesale Tire",
        address: "1234 Street, NW",
        city: "Calgary",
        country: "Canada",
        phone: "(555) 123-4567",
      },
      client: {
        company: "PRINCE TIRES LTD",
        address: order.shipping_address || "N/A",
        zip: "T2G 0A4",
        city: "Calgary",
        country: "Canada",
        phone: "(403) 606-5459",
      },
      information: {
        number: order.id,
        date: new Date(order.createdAt).toLocaleDateString(),
        "due-date": new Date(order.updatedAt).toLocaleDateString(),
      },
      products: [...products, shippingFee],
      "bottom-notice": "Thank you for your business!",
      settings: {
        layout: {
          lineHeight: 1.5, // Adjust line height for better readability
        },
      },
      translate: {
        subtotal: "Subtotal",
        discount: "Discount",
        tax: "Tax",
        total: "Total",
      },
    };

    const result = await easyinvoice.createInvoice(invoiceData);
    const filePath = path.resolve(
      __dirname,
      `../invoices/invoice_${order.id}.pdf`
    );

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, result.pdf, "base64");
    res.download(filePath, `invoice_${order.id}.pdf`);
  } catch (err) {
    console.error("Error generating invoice:", err.message);
    res
      .status(500)
      .json({ message: "Error generating invoice", error: err.message });
  }
};
