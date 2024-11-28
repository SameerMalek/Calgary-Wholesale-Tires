import express from "express";
import {
  createCheckoutSession,
  handleStripeWebhook,
} from "../controller/stripeController.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
// Apply express.raw() for the webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
export default router;

/* 

-- For stripe integration --
Command for api> integrated terminal: 
stripe listen --forward-to localhost:8800/api/stripe/webhook


cmd>>
>"C:\Users\Owner\Downloads\stripe_1.22.0_windows_x86_64\stripe.exe" listen --forward-to localhost:8800/api
/stripe/webhook

*/
