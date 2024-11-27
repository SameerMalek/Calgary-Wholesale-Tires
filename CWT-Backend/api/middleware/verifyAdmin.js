import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  // console.log(`Incoming request: ${req.method} ${req.url}`);

    const token = req.cookies.adminToken;
  
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: "Not authorized as admin" });
      }
      req.adminId = decoded.id;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  
  }