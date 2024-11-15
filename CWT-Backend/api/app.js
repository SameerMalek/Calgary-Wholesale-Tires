// // Import dependencies
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// // Import routes
// import userRoute from "../api/routes/auth.route.js";
// import productRoute from "../api/routes/product.route.js";
// import categoryRoute from "../api/routes/category.route.js";
// import filterProductRoute from "../api/routes/filterProduct.route.js";
// import orderRoutes from "../api/routes/orderRoutes.js";
// import orderItemRoutes from "../api/routes/orderItemRoutes.js";
// import cartRoutes from "../api/routes/cartRoutes.js";
// import wishlistRoutes from "../api/routes/wishlistRoutes.js";
// import discountRoutes from "../api/routes/discountRoutes.js";
// import reviewRoutes from "../api/routes/reviewRoutes.js";
// import notificationRoutes from "../api/routes/notificationRoutes.js";
// import shipmentRoutes from "../api/routes/shipmentRoutes.js";
// import inventoryTrackingRoutes from "../api/routes/inventoryTrackingRoutes.js";
// import salesReportRoutes from "../api/routes/salesReportRoutes.js";
// import productManagementRoutes from "../api/routes/productManagementRoutes.js";
// import userRoute from "../api/routes/user.route.js";
// import authRoute from "../api/routes/auth.route.js";
// import postRoute from "../api/routes/post.Route.js";
// import testRoute from "../api/routes/test.route.js";
// import searchRoute from "../api/routes/search.route.js";
// import stripeRoutes from "../api/routes/stripeRoutes.js"; // Import Stripe routes

// // Initialize app
// const app = express();
// const PORT = 8800;

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/test", testRoute);
// // Use routes
// //app.use("/api/auth", userRoute);
// app.use("/api", productRoute);
// app.use("/api", categoryRoute);
// app.use("/api", filterProductRoute);
// app.use("/api/orders", orderRoutes);
// app.use("/api/order-items", orderItemRoutes);
// app.use("/api", cartRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/discounts", discountRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/shipments", shipmentRoutes);
// app.use("/api/inventory-tracking", inventoryTrackingRoutes);
// app.use("/api/sales-reports", salesReportRoutes);
// app.use("/api/product-management", productManagementRoutes);
// app.use("/api/products", searchRoute);
// app.use("/api/stripe", stripeRoutes); // Add the Stripe route

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is successfully started at PORT: ${PORT}`);
// });

// Import dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes
import authRoute from "../api/routes/auth.route.js";
import productRoute from "../api/routes/product.route.js";
import categoryRoute from "../api/routes/category.route.js";
import filterProductRoute from "../api/routes/filterProduct.route.js";
import orderRoutes from "../api/routes/orderRoutes.js"; // Includes order routes and invoice route
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
import userRoute from "../api/routes/user.route.js";
import postRoute from "../api/routes/post.route.js";
import testRoute from "../api/routes/test.route.js";
import searchRoute from "../api/routes/search.route.js";
import stripeRoutes from "../api/routes/stripeRoutes.js";
import uploadProductRoute from "../api/routes/uploadProduct.route.js";
import adminRoutes from "../api/routes/admin.routes.js";

// Initialize app
// Initialize the app
const app = express();
const PORT = process.env.PORT || 8800 ;


// Use CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


//Check if the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Check if the server is online
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is online' });
});


// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Apply express.json() middleware to all routes except for the Stripe webhook route
app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next(); // Skip express.json() for the /webhook route
  } else {
    express.json()(req, res, next); // Use express.json() for all other routes
  }
});

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Use routes
app.use("/api/users", userRoute); // User routes
app.use("/api/posts", postRoute); // Post routes
app.use("/api/auth", authRoute); // Auth routes
app.use("/api/test", testRoute); // Test routes
app.use("/api", productRoute); // Product routes
app.use("/api", categoryRoute); // Category routes
app.use("/api", filterProductRoute); // Filter product routes
app.use("/api/orders", orderRoutes); // Order routes, including invoice generation
app.use("/api/order-items", orderItemRoutes); // Order item routes
app.use("/api", cartRoutes); // Cart routes
app.use("/api/wishlist", wishlistRoutes); // Wishlist routes
app.use("/api/discounts", discountRoutes); // Discount routes
app.use("/api/reviews", reviewRoutes); // Review routes
app.use("/api/notifications", notificationRoutes); // Notification routes
app.use("/api/shipments", shipmentRoutes); // Shipment routes
app.use("/api/inventory-tracking", inventoryTrackingRoutes); // Inventory tracking routes
app.use("/api/sales-reports", salesReportRoutes); // Sales report routes
app.use("/api/product-management", productManagementRoutes); // Product management routes
app.use("/api/products", searchRoute); // Product search routes
app.use("/api/stripe", stripeRoutes); // Stripe payment routes
app.use("/api/product", uploadProductRoute); // Product upload routes
app.use("/api/admin", adminRoutes); // Admin routes

// Commented out redundant line
// app.use("/api/product", uploadProduct);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is successfully started at PORT: ${PORT}`);
});