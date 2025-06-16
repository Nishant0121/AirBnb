const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Create a booking
router.post("/", async (req, res) => {
  const { userId, listingId, startDate, endDate, totalPrice } = req.body;
  const booking = new Booking({
    userId,
    listingId,
    startDate,
    endDate,
    totalPrice,
  });
  await booking.save();
  res.status(201).json(booking);
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
