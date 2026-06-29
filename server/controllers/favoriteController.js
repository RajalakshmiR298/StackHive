const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");

// GET favorites
const getFavoriteEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD favorite
const addFavoriteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, title, image } = req.body;

    // Check if already favorited (handle both string and ObjectId formats)
    const exists = await Favorite.findOne({ 
      userId, 
      $or: [
        { eventId: eventId },
        { eventId: mongoose.Types.ObjectId.isValid(eventId) ? eventId : undefined }
      ]
    });

    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const fav = await Favorite.create({
      userId,
      eventId,
      title,
      image,
    });

    res.status(201).json(fav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE favorite
const removeFavoriteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    // Try to delete by exact match first, then try with ObjectId conversion
    let result = await Favorite.findOneAndDelete({ userId, eventId });
    
    if (!result && mongoose.Types.ObjectId.isValid(eventId)) {
      result = await Favorite.findOneAndDelete({ userId, eventId: eventId });
    }

    if (!result) {
      // Try string comparison for safety
      const allFavorites = await Favorite.find({ userId });
      const fav = allFavorites.find(f => String(f.eventId) === String(eventId));
      if (fav) {
        result = await Favorite.findByIdAndDelete(fav._id);
      }
    }

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavoriteEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
};