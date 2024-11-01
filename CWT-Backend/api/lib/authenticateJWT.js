// CWT-Backend/api/lib/authenticateJWT.js
import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;  // Get JWT from cookies

  if (!token) {
    return res.status(401).json({ message: "Authentication failed! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Verify token
    req.user = decoded;  // Attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};
