import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

dotenv.config();

const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE;

export const adminRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    position,
    adminCode
  } = req.body;

  try {
    // Verify admin registration code
    if (adminCode !== ADMIN_REGISTRATION_CODE) {
      return res.status(403).json({ message: "Invalid admin registration code" });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await prisma.admin.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        position,
        role: "admin"
      }
    });

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({ message: "Failed to create admin account" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
        isAdmin: true
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    // Remove password from admin object
    const { password: _, ...adminInfo } = admin;

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).status(200).json({
      ...adminInfo,
      isAdmin: true
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("adminToken")
    .status(200)
    .json({ message: "Admin logged out successfully" });
};
