const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  pricePerNight: Number,
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: [String],
  availableDates: [Date],
});

module.exports = mongoose.model("Listing", listingSchema);
