import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);  

const YOUR_DOMAIN = 'http://localhost:3000';  

export const createCheckoutSession = async (req, res) => {
  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,  
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/payment-status?status=success`,
      cancel_url: `${YOUR_DOMAIN}/payment-status?status=failure`,
    });

    // Send the session ID back to the frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
