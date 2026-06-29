import api from './api';

/**
 * Fetch all events listing.
 * @returns {Promise<Array>} List of events (projected fields only)
 */
export const getAllEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

/**
 * Fetch detailed event by ID.
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Full event details
 */
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

/**
 * Search events by query string.
 * @param {string} query - Search term
 * @returns {Promise<Array>} List of matching events (projected fields only)
 */
export const searchEvents = async (query) => {
  const response = await api.get(`/events/search?query=${encodeURIComponent(query)}`);
  return response.data;
};

/**
 * Filter events by category.
 * @param {string} category - Category name
 * @returns {Promise<Array>} List of filtered events (projected fields only)
 */
export const filterByCategory = async (category) => {
  const response = await api.get(`/events/category/${encodeURIComponent(category)}`);
  return response.data;
};

/**
 * Get nearby events matching user's location.
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of matching nearby events (projected fields only)
 */
export const getNearbyEvents = async (userId) => {
  const response = await api.get(`/events/nearby/${encodeURIComponent(userId)}`);
  return response.data;
};
