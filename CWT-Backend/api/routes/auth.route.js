import express from "express";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  getAllUsers,
  approveUser,
  declineUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/users", getAllUsers);
router.put("/users/:userId/approve", approveUser); // Admin approves user
router.delete("/decline-user/:userId", declineUser); // Admin declines user

export default router;
