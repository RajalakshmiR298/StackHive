const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  searchEvents,
  getEventsByCategory,
  getNearbyEvents,
} = require('../controllers/eventController');

// 1. Get all events listing
router.get('/', getEvents);

// 2. Search events (must be defined BEFORE :id)
router.get('/search', searchEvents);

// 3. Filter events by category (must be defined BEFORE :id)
router.get('/category/:category', getEventsByCategory);

// 4. Get events by nearby/user location (must be defined BEFORE :id)
router.get('/nearby/:userId', getNearbyEvents);

// 5. Get event details by ID
router.get('/:id', getEventById);

module.exports = router;
