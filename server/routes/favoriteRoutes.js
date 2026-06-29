const express = require("express");
const router = express.Router();

const {
  getFavoriteEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
} = require("../controllers/favoriteController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

// GET favorites
router.get("/", getFavoriteEvents);

// ADD favorite
router.post("/", addFavoriteEvent);

// REMOVE favorite
router.delete("/:eventId", removeFavoriteEvent);

module.exports = router;