const dotenv = require("dotenv");

// Load .env first
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
const app = require("./app");

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});