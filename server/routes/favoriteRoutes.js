const express = require('express');
const router = express.Router();
const {
  getFavoriteEvents,
  addFavoriteEvent,
  removeFavoriteEvent,
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get("/", getFavoriteEvents);

router.route('/:eventId')
  .post(addFavoriteEvent)
  .delete(removeFavoriteEvent);

module.exports = router;
