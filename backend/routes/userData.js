// routes/userData.js

const express = require("express");
const User = require("../models/User");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token and get user data
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// GET /api/user/data
router.get("/data", authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (user.isHost) {
      // Host: get listings they created
      const listings = await Listing.find({ hostId: user._id });
      return res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isHost: true,
        },
        listings,
      });
    } else {
      // Regular user: get booking history
      const bookings = await Booking.find({ userId: user._id }).populate(
        "listingId"
      );
      return res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isHost: false,
        },
        bookings,
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
