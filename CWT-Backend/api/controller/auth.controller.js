// import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "../lib/prisma.js";
// import { PrismaClientValidationError } from "@prisma/client/runtime/library";

// dotenv.config();

// export const register = async (req, res) => {
//   const {
//     companyName,
//     avatar,
//     address,
//     city,
//     province,
//     postalCode,
//     phoneNumber,
//     email,
//     password,
//     firstName,
//     owner,
//     lastName,
//     operationYear,
//     annualPurchase,
//     comments,
//   } = req.body;

//   try {
//     // Hashed Password:
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Creating a new User and Saving to database:
//     const newUser = await prisma.user.create({
//       data: {
//         companyName,
//         avatar,
//         address,
//         city,
//         province,
//         postalCode,
//         phoneNumber,
//         email,
//         password: hashedPassword,
//         firstName,
//         owner,
//         lastName,
//         operationYear,
//         annualPurchase,
//         comments,
//       },
//     });
//     console.log(newUser);
//     res.status(201).json({ message: "User created successfully!" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to create User!" });
//   }
// };

// // User Login:
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     // Checking if user exists:
//     if (!user) return res.status(400).json({ message: "Invalid EmailId!" });

//     // Checking if password is correct:
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: "Invalid Password!" });

//     //Generate Cookie Token and Send to the User:

//     const age = 1000 * 60 * 60 * 24 * 7;
//     const token = jwt.sign(
//       {
//         id: user.email,
//         isAdmin: false,
//       },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: age }
//     );

//     const { password: _, ...info } = user;

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: age,
//       })
//       .status(200)
//       .json(info);
//   } catch (err) {
//     //console.log(err);
//     console.error("Failed to login!", err);
//     res.status(500).json({ message: "Failed to login!" });
//   }
// };

// // User Logout:
// export const logout = (req, res) => {
//   res
//     .clearCookie("token")
//     .status(200)
//     .json({ message: "User logged out successfully!" });
// };

// //User Forgot Password:
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // Generate password reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenHash = await bcrypt.hash(resetToken, 10);
//     const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

//     // Update user with reset token and expiry
//     await prisma.user.update({
//       where: { email },
//       data: { resetToken: resetTokenHash, resetTokenExpiry },
//     });

//     // Send email with reset link
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       secure: true,
//     });

//     const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset",
//       text: `Reset your password using this link: ${resetUrl}`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Password reset email sent!" });
//   } catch (error) {
//     console.error("Error sending password reset email", error);
//     if (error instanceof PrismaClientValidationError) {
//       console.error("Validation Error", error);
//     }
//     res.status(500).json({ message: "Error sending reset email", error });
//   }
// };

// // User Password Reset:
// export const resetPassword = async (req, res) => {
//   const { email, token, newPassword } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
//       return res.status(400).json({ message: "Invalid or expired token!" });
//     }

//     const isValidToken = await bcrypt.compare(token, user.resetToken);
//     if (!isValidToken)
//       return res.status(400).json({ message: "Invalid token!" });

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update password and clear reset token fields
//     await prisma.user.update({
//       where: { email },
//       data: {
//         password: hashedPassword,
//         resetToken: null,
//         resetTokenExpiry: null,
//       },
//     });

//     res.status(200).json({ message: "Password reset successful!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error resetting password", error });
//   }
// };

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

    // Send notification to admin for approval
    await prisma.notification.create({
      data: {
        user_id: "adminId", // Replace with the actual admin ID
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
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

    // Check if user exists and is approved
    if (!user) return res.status(400).json({ message: "Invalid EmailId!" });
    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "Account pending admin approval." });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

      //Generate Cookie Token and Send to the User:
      
      const age = 1000 * 60 * 60 * 24 * 7; 
      const token = jwt.sign(
        {
          id: user.id,
          isAdmin: false,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );
    const { password: _, ...info } = user;

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password!" });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(200)
      .json({ message: "Login successful!" });
  } catch (err) {
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

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: { resetToken: resetTokenHash, resetTokenExpiry },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Reset your password using this link: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error sending password reset email", error);
    res.status(500).json({ message: "Error sending reset email" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    const isValidToken = await bcrypt.compare(token, user.resetToken);
    if (!isValidToken)
      return res.status(400).json({ message: "Invalid token!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
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
