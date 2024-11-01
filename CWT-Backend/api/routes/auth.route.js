import express from 'express';
import { 
login,
logout,
register, 
forgotPassword, 
resetPassword } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);

export default router;
