import jwt from "jsonwebtoken";
import prisma from '../lib/prisma.js'; // Ensure Prisma client is correctly imported

export const authenticateJWT = async (req, res, next) => {
  // Get the JWT from cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication failed! No token provided." });
  }

  try {
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Fetch the user by the ID in the decoded token payload
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is approved
    if (!user.isApproved) {
      return res.status(403).json({ message: "User is not approved by admin" });
    }

    // Attach user details to request object for further processing
    req.user = { id: user.id, email: user.email };
    console.log("Authenticated user ID:", req.user.id); // Log for debugging

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

