const express = require("express");
const Listing = require("../models/Listing");
const { upload } = require("../middleware/cloudinary");
const isHost = require("../middleware/isHost"); // 🔐 add this
const router = express.Router();

// POST: Only host can create a listing
router.post("/", isHost, upload.array("images"), async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs

    const newListing = new Listing({
      ...req.body,
      images: imageUrls,
      hostId: req.user.id, // from token
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all listings (public)
router.get("/", async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// GET single listing (public)
router.get("/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.json(listing);
});

// PUT: Only host can update listing
router.put("/:id", isHost, async (req, res) => {
  const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE: Only host can delete listing
router.delete("/:id", isHost, async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.json({ message: "Listing deleted" });
});

module.exports = router;
