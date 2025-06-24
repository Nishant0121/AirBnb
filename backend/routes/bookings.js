// routes/bookings.js

const express = require("express");
const Booking = require("../models/Booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

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
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const bookings = await Booking.find({ userId });
  res.json(bookings);
});

// Get a particular booking
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
});

// Update a booking
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { userId, listingId, startDate, endDate, totalPrice } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    id,
    { userId, listingId, startDate, endDate, totalPrice },
    { new: true }
  );
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
});

// Delete a booking
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await Booking.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.status(204).json({ message: "Booking deleted" });
});

module.exports = router;
