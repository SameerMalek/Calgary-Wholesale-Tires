import express from 'express';
import { createCheckoutSession } from '../controller/stripeController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export default router;
