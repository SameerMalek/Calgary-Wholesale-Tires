import Stripe from "stripe";
import { addOrder } from "../controller/order.controller.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";

export const createCheckoutSession = async (req, res) => {
  try {
    const { items, user_id, shipping_address, billing_address, total_amount } =
      req.body;

    // Validate input data (log them)
    console.log("Received data:", req.body);

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/payment-status?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/payment-status?status=failure`,
      metadata: {
        user_id: user_id,
        total_amount: total_amount,
        items: JSON.stringify(items), // Serialize items for order creation
      },
    });
    console.log("Stripe session created:", session);

    // Send the session ID back to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
    console.log("Webhook event received:", event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Stripe session object:", session);

      // Extract metadata and create order
      const user_id = session.metadata.user_id;
      const total_amount = parseFloat(session.metadata.total_amount);
      const items = JSON.parse(session.metadata.items);

      const orderData = {
        user_id,
        total_amount,
        shipping_address: session.shipping ? session.shipping.address : "N/A",
        billing_address: session.customer_details.address,
        status: 'completed',
        payment_status: 'completed',
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Attempt to add the order and log success
      try {
        await addOrder({ body: orderData });
        console.log("Order created from Stripe session.");
      } catch (error) {
        console.error("Error adding order:", error);
      }
    }

    // Send a single response
    res.status(200).send({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
};