import express from 'express';
import { adminRegister, adminLogin, adminLogout } from '../controller/adminAuth.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.post('/admin-register', adminRegister);
router.post('/admin-login', adminLogin);
router.post('/admin-logout', adminLogout);
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

export default router;
