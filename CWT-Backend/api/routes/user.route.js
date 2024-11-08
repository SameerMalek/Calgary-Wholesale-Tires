// import express from "express";

// const router = express.Router();

// /*export default router;
// const router = express.Router();

// // Define your routes here
// router.get("/", (req, res) => {
//   res.send("User route is working!");
// });*/

// export default router; // Default export for the router*/

import express from "express";
import { getAllUsers } from "../controller/auth.controller.js"; // Adjust the path if necessary

const router = express.Router();

// Define the route to fetch all users
router.get("/", getAllUsers); // This will map to GET /api/users

export default router;
