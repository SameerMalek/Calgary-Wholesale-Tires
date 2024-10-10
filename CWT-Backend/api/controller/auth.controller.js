import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

dotenv.config();

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
    // Hashed Password:
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new User and Saving to database:
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
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create User!" });
  }
};

// User Login:
// (Allow the user's email and password to login explicitly role-based!)
// (Make a middleware isApproved and JWTAuth for allowing the User to Login)
// (Allow the admin's user email and password to login explicitly role-based!)
export const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await prisma.user.findUnique({ where: {email} });
    
    // Checking if user exists:
     if (!user) 
      return res.status(400).json({ message: "Invalid EmailId!" });

    // Checking if password is correct:
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
      
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid Password!" });

      //Generate Cookie Token and Send to the User:
      
      const age = 1000 * 60 * 60 * 24 * 7; 
      const token = jwt.sign(
        {
          id: user.email,
          isAdmin: false,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      ); 

      const { password: _, ...info } = user;

      res.cookie("token", token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: age })
      .status(200)
      .json(info);
      
    } 
    catch (err) {
      //console.log(err);
      console.error("Failed to login!", err);
      res.status(500).json({ message: "Failed to login!" });  
    } 
};

// User Logout:
export const logout = (req, res) => {
  res.clearCookie("token")
    .status(200)
    .json({ message: "User logged out successfully!" });
};
