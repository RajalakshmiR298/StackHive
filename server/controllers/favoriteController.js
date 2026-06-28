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

    const exists = await Favorite.findOne({ userId, eventId });

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
    const { eventId } = req.params;

    await Favorite.findOneAndDelete({ userId, eventId });

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