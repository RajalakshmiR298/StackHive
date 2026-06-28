const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const connectionRoutes = require('./routes/connectionRoutes');

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/connections', connectionRoutes);

// Base route placeholder
app.get('/', (req, res) => {
  res.json({ message: 'CampusConnect API is running...' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
