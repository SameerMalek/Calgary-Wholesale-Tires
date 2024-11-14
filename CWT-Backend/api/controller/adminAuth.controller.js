import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { check, validationResult } from 'express-validator';

dotenv.config();

const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE;

// Registration
export const adminRegister = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, position, adminCode } = req.body;

    try {
      if (adminCode !== ADMIN_REGISTRATION_CODE) {
        return res.status(403).json({ message: "Invalid admin registration code" });
      }

      const existingAdmin = await prisma.admin.findUnique({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists with this email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.admin.create({
        data: { firstName, lastName, email, password: hashedPassword, position, role: "admin" }
      });

      res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
      console.error("Admin registration error:", err);
      res.status(500).json({ message: "Failed to create admin account" });
    }
  }
];

// Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin", isAdmin: true },
      process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    res.cookie("adminToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 })
      .status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Failed to login" });
  }
};

// Logout
export const adminLogout = (req, res) => {
  res.clearCookie("adminToken").status(200).json({ message: "Admin logged out successfully" });
};
