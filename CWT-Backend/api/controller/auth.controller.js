import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

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
    res.status(200).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create User!" });
  }
};

// User Login:
// (Make a middelware isAprroved and JWTAuth for allowing the User to Login)
// (Allow the admin's user email and password to login explicitly role-based!)
export const login = async (req, res) => {};

// User Logout:
export const logout = async (req, res) => {};
