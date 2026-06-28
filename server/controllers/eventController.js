const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

// Helper to escape special characters for regex search
const escapeRegex = (string) => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).select('title date location image');
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error fetching events' });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error fetching event details' });
  }
};

// @desc    Search events by title or description
// @route   GET /api/events/search
// @access  Public
const searchEvents = async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query ? escapeRegex(query) : '', 'i');
    const events = await Event.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    }).select('title date location image');
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error searching events' });
  }
};

// @desc    Filter events by category
// @route   GET /api/events/category/:category
// @access  Public
const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const events = await Event.find({ category }).select('title date location image');
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error filtering events by category' });
  }
};

// @desc    Get nearby events matching the user's location
// @route   GET /api/events/nearby/:userId
// @access  Public
const getNearbyEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.location) {
      return res.status(200).json([]);
    }
    const events = await Event.find({ location: user.location }).select('title date location image');
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error fetching nearby events' });
  }
};

// Stubs for private/unused actions (prevent imports breaking elsewhere)
const createEvent = async (req, res) => {
  return res.status(501).json({ message: 'Not implemented' });
};
const updateEvent = async (req, res) => {
  return res.status(501).json({ message: 'Not implemented' });
};
const deleteEvent = async (req, res) => {
  return res.status(501).json({ message: 'Not implemented' });
};

module.exports = {
  getEvents,
  getEventById,
  searchEvents,
  getEventsByCategory,
  getNearbyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
