const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Optional: remove this after confirming everything works
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

const connectDB = require("./config/db");

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
const favoriteRoutes = require("./routes/favoriteRoutes");
const eventRoutes = require("./routes/eventRoutes");
const connectionRoutes = require("./routes/connectionRoutes");

app.use("/api/favorites", favoriteRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/connections", connectionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});