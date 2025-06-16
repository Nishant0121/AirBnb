const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
