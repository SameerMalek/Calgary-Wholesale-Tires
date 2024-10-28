// Import dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes
import userRoute from "../api/routes/auth.route.js";
import productRoute from "../api/routes/product.route.js";
import categoryRoute from "../api/routes/category.route.js";
import filterProductRoute from "../api/routes/filterProduct.route.js";
import orderRoutes from "../api/routes/orderRoutes.js";
import orderItemRoutes from "../api/routes/orderItemRoutes.js";
import cartRoutes from "../api/routes/cartRoutes.js";
import wishlistRoutes from "../api/routes/wishlistRoutes.js";
import discountRoutes from "../api/routes/discountRoutes.js";
import reviewRoutes from "../api/routes/reviewRoutes.js";
import notificationRoutes from "../api/routes/notificationRoutes.js";
import shipmentRoutes from "../api/routes/shipmentRoutes.js";
import inventoryTrackingRoutes from "../api/routes/inventoryTrackingRoutes.js";
import salesReportRoutes from "../api/routes/salesReportRoutes.js";
import productManagementRoutes from "../api/routes/productManagementRoutes.js";
import searchRoute from "../api/routes/search.route.js";
import stripeRoutes from "../api/routes/stripeRoutes.js";
import uploadProduct from "../api/routes/uploadProduct.route.js";

// Initialize app
const app = express();
const PORT = 8800;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/api/auth", userRoute);
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", filterProductRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/inventory-tracking", inventoryTrackingRoutes);
app.use("/api/sales-reports", salesReportRoutes);
app.use("/api/product-management", productManagementRoutes);
app.use("/api/products", searchRoute);
app.use("/api/stripe", stripeRoutes); 
app.use("/api/product", uploadProduct); 

// Start server
app.listen(PORT, () => {
  console.log(`Server is successfully started at PORT: ${PORT}`);
});
