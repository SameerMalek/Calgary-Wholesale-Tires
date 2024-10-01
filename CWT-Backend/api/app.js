import express from "express";
import cookieParser from 'cookie-parser';


import userRoute from "../api/routes/auth.route.js";
import productRoute from "../api/routes/product.route.js";
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

const app = express();
const PORT = 8800;


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", userRoute);
app.use("/api", productRoute);
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


app.listen(PORT, () => {
    console.log(`Server is successfully started at PORT: ${PORT}`);
});
