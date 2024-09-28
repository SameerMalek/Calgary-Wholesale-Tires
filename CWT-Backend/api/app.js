import express from "express";
import userRoute from "../api/routes/auth.route.js";
import productRoute from "../api/routes/product.route.js"
import cookieParser  from 'cookie-parser';

const app = express();
const PORT=8800;

app.use(express.json());
app.use(cookieParser());

// Routes: 
app.use("/api/auth",userRoute);
app.use("/api",productRoute);


app.listen(PORT, ()=> {
    console.log(`Server is successfully started at PORT: ${PORT}`);
});