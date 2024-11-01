import express from "express";

const router = express.Router();

export default router;
const router = express.Router();

// Define your routes here
router.get("/", (req, res) => {
  res.send("User route is working!");
});

export default router; // Default export for the router
