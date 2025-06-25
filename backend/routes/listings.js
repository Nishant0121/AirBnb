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

// POST: Add listing via JSON body with predefined image URLs (no file upload)
router.post("/json", isHost, async (req, res) => {
  try {
    const listings = req.body.listings; // Expecting an array of listing objects

    if (!Array.isArray(listings) || listings.length === 0) {
      return res.status(400).json({ error: "Listings array is required." });
    }

    const newListings = await Promise.all(
      listings.map(async (listingData) => {
        const { title, description, price, location, images } = listingData;

        if (!Array.isArray(images) || images.length === 0) {
          throw new Error("Each listing must have an images array.");
        }

        const newListing = new Listing({
          ...listingData,
          images, // assumed to be array of valid image URLs
          hostId: req.user.id, // from token
        });

        await newListing.save();
        return newListing;
      })
    );

    res.status(201).json(newListings);
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
router.put("/:id", isHost, upload.array("images"), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const imageUrls = req.files.map((file) => file.path); // Cloudinary URLs

    listing.title = req.body.title || listing.title;
    listing.description = req.body.description || listing.description;
    listing.price = req.body.price || listing.price;
    listing.location = req.body.location || listing.location;
    listing.images = imageUrls.length ? imageUrls : listing.images;
    listing.hostId = req.user.id; // from token

    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Only host can delete listing
router.delete("/:id", isHost, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
