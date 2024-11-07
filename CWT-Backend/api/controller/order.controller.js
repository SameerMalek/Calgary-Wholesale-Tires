import prisma from "../lib/prisma.js";
import easyinvoice from "easyinvoice";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Order controller:
export const createOrder = async (req, res) => {
  const { user_id, items, shipping_address, billing_address, total_amount } =
    req.body;

  try {
    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_amount * 100), // amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Store the order in the database
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
            product_id: item.productId,
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
  console.log("Data Recieved", req);

  try {
    const billingAddressString =
    typeof billing_address === "object"
      ? JSON.stringify(billing_address)
      : billing_address;
    const newOrder = await prisma.order.create({
      data: {
        user_id,
        total_amount: parseFloat(total_amount),
        shipping_address,
        billing_address:billingAddressString,
        status: status || "pending",
        payment_status: payment_status || "pending",
      },
    });
    console.log(newOrder);
    return newOrder;
  } catch (err) {
    throw new Error(`Error creating order: ${err.message}`);
  }
};

// Fetch all orders
export const getOrders = async (req, res) => {
  const { userId } = req.params; // assuming userId is passed as a route parameter

  try {
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: {
        orderItems: {
          include: {
            product: true, // Include product details if needed
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order by latest first
      },
    });

    res.status(200).json({ orders });
  } catch (err) {
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
  const { orderId } = req.params;
  const {
    status,
    total_amount,
    shipping_address,
    billing_address,
    payment_status,
  } = req.body;

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

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating order", error: err.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });
    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: err.message });
  }
};

// Get all orders by user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params; // assuming userId is passed as a route parameter

  // Debug: Log the userId received in the request
  console.log("Received userId:", userId);

  try {
    // Debug: Log the query being executed
    console.log("Fetching orders for userId:", userId);

    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: { orderItems: true },
    });

    // Debug: Log the result of the query
    console.log("Fetched orders:", orders);

    // If no orders are found, log and return a 404
    if (!orders || orders.length === 0) {
      console.log(`No orders found for userId: ${userId}`);
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    // Debug: Log error details if query fails
    console.error("Error fetching orders:", err);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

// Generate invoice for an order
export const generateInvoice = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

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
        city: "CALGARY",
        country: "Canada",
        phone: "(403) 606-5459",
      },
      information: {
        number: order.id,
        date: new Date(order.createdAt).toLocaleDateString(),
        "due-date": new Date(order.updatedAt).toLocaleDateString(),
        purchaseOrder: "18RAV4",
        delivery: "85649170",
      },
      products: [
        ...order.orderItems.map((item) => ({
          quantity: item.quantity,
          description: `Product ID: ${item.product_id}`,
          "tax-rate": 5,
          price: item.price,
        })),
        {
          quantity: 1,
          description: "Shipping Fees",
          "tax-rate": 5,
          price: 200.0,
        },
      ],
      "bottom-notice": "Thank you for your business!",
      settings: {
        columns: {
          quantity: "Qty",
          description: "Description",
          price: "Unit Price",
          tax: "Tax",
          amount: "Total",
        },
      },
      translate: {
        invoice: "Invoice",
        number: "Invoice No.",
        date: "Date",
        "due-date": "Due Date",
        subtotal: "Sub-Total",
        discounts: "Discount",
        tax: "GST",
        total: "TOTAL",
      },
      totals: [
        { label: "Freight", value: 30.0 },
        { label: "Eco Fees", value: 0.0 },
        { label: "Sub-Total", value: order.total_amount },
        { label: "GST", value: (order.total_amount * 0.05).toFixed(2) },
        {
          label: "Total",
          value: (order.total_amount * 1.05 + 30.0).toFixed(2),
        },
      ],
    };

    const result = await easyinvoice.createInvoice(invoiceData);
    const filePath = path.join(
      __dirname,
      `../../invoices/invoice_${order.id}.pdf`
    );

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, result.pdf, "base64");
    res.download(filePath, `invoice_${order.id}.pdf`);
  } catch (err) {
    console.error("Error generating invoice:", err);
    res
      .status(500)
      .json({ message: "Error generating invoice", error: err.message });
  }
};
