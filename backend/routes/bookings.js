// routes/bookings.js

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

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
    console.error(err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Create a booking with payment intent
router.post("/", async (req, res) => {
  try {
    const { userId, listingId, startDate, endDate, amount, paymentMethodId } =
      req.body;

    const amountInCents = parseInt(amount);
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Create and confirm PaymentIntent in one call
    const confirmedIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.CLIENT_URL}/bookings/success`,
      metadata: {
        userId: userId.toString(),
        listingId: listingId.toString(),
      },
    });

    // Handle 3D Secure
    if (confirmedIntent.status === "requires_action") {
      return res.status(200).json({
        requiresAction: true,
        clientSecret: confirmedIntent.client_secret,
      });
    }

    // Check for successful payment
    if (confirmedIntent.status !== "succeeded") {
      return res.status(400).json({
        error: "Payment failed",
        status: confirmedIntent.status,
      });
    }

    // Save booking to DB
    const booking = new Booking({
      userId,
      listingId,
      startDate,
      endDate,
      totalPrice: amountInCents / 100,
      paymentId: confirmedIntent.id,
      paymentStatus: "completed",
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
      paymentId: confirmedIntent.id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      error: error.message,
      type: error.type,
      code: error.code,
    });
  }
});

// Get bookings of a user
router.get("/user", authenticate, async (req, res) => {
  try {
    const hostId = req.user.id;

    // Get all listings owned by the host
    const listings = await Listing.find({ hostId });

    const results = await Promise.all(
      listings.map(async (listing) => {
        const bookings = await Booking.find({
          listingId: listing._id,
        }).populate("userId", "username email"); // Guest info

        if (bookings.length > 0) {
          return {
            listing,
            bookings,
          };
        }
      })
    );

    const filteredResults = results.filter(Boolean);
    res.json(filteredResults);
  } catch (err) {
    console.error("Error fetching host listings and bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📄 GET a specific booking (with optional user/listing details)
router.get("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "username email")
      .populate("listingId");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Ensure only the host of this listing can see it
    if (booking.listingId.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✏️ UPDATE a booking — only host of listing can update
router.put("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const listing = await Listing.findById(booking.listingId);
    if (!listing || listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { startDate, endDate, totalPrice } = req.body;

    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.totalPrice = totalPrice;

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ❌ DELETE a booking — only host of listing can delete
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const listing = await Listing.findById(booking.listingId);
    if (!listing || listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await booking.deleteOne();
    res.status(204).json({ message: "Booking deleted" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
