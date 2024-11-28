import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

dotenv.config();

// User Registration
export const register = async (req, res) => {
  const {
    companyName,
    avatar,
    address,
    city,
    province,
    postalCode,
    phoneNumber,
    email,
    password,
    firstName,
    owner,
    lastName,
    operationYear,
    annualPurchase,
    comments,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with isApproved set to false
    const newUser = await prisma.user.create({
      data: {
        companyName,
        avatar,
        address,
        city,
        province,
        postalCode,
        phoneNumber,
        email,
        password: hashedPassword,
        firstName,
        owner,
        lastName,
        operationYear,
        annualPurchase,
        comments,
        isApproved: false, // Requires admin approval
      },
    });

    // Fetch admin user ID dynamically from the admin table
    const adminUser = await prisma.admin.findFirst({
      where: { role: "admin" },
    });

    // Check if an admin user exists
    if (!adminUser) {
      throw new Error("Admin user not found!");
    }

    // Send notification to the admin for approval
    await prisma.notification.create({
      data: {
        user_id: adminUser.id,
        type: "new_registration",
        message: `New user registration pending approval: ${newUser.email}`,
        status: "unread",
      },
    });

    res.status(201).json({
      message: "User created successfully! Waiting for admin approval.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create User!" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Retrieves all users without filters
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// User Login with Approval Check
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Checking if user exists:
    if (!user) return res.status(404).json({ message: "Invalid EmailId!" });

    // Check if user exists
    if (!user) return res.status(400).json({ message: "Invalid Email!" });

    // Check if the account is approved by the admin
    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is pending admin approval." });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    //Generate Cookie Token and Send to the User:

    const age = 24 * 60 * 60 * 1000; // 1 day
    const token = jwt.sign(
      {
        // email: user.email,
        // userId: user.id,
        id: user.email,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    const { password: _, ...info } = user;

    //Send JWT Token as Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: age,
      })
      .status(200)
      .json(info);

    // // Remove password field from response
    // const { password: _, ...info } = user;
    // res.status(200).json(info);
  } catch (err) {
    //console.log(err);
    console.error("Failed to login!", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// User Logout
export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "User logged out successfully!" });
};

//User Forgot Password:
// Send email with reset link
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  secure: true,
});
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Email not registered!" });

    // Generate OTP and hash it
    /*const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour*/

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with OTP and expiry
    await prisma.user.update({
      where: { email },
      data: { resetToken: otpHash, resetTokenExpiry: otpExpiry },
    });

    //const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;

    //Send OTP via email
    const mailOptions = {
      from: {
        name: "CWT",
        address: process.env.GMAIL_USER,
      },
      to: email,
      subject: "Password Reset OTP",
      text: `Reset OTP is: ${otp}. It expires in 10 minutes.`,
      /*html: `
      <h1>Password Reset OTP Request</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `*/
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent!" });
  } catch (error) {
    console.error("Error sending OTP", error);
    /* if (error instanceof PrismaClientValidationError) {
      console.error("Validation Error", error);
    }*/
    res.status(500).json({
      message: "Error sending reset email",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  // console.log("email on server is:", email);
  // console.log("otp on server is:", otp);

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required!" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    const isValidOtp = await bcrypt.compare(otp, user.resetToken);
    if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP!" });

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP", error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

// User Password Reset:
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required!" });
  }
  try {
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    // Send confirmation email
    /*const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      text: "Your password has been successfully reset.",
    };
    await transporter.sendMail(confirmationMailOptions);*/

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password on serverside", error });
  }
};

// Approve User
export const approveUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
    });
    res.status(200).json({ message: "User approved successfully!" });
  } catch (error) {
    console.error("Error approving user", error);
    res.status(500).json({ message: "Error approving user" });
  }
};

// Decline User
export const declineUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "User request declined and deleted." });
  } catch (error) {
    console.error("Error declining user", error);
    res.status(500).json({ message: "Error declining user" });
  }
};
