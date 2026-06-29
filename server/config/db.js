const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    // Fix for MongoDB Atlas DNS resolution issues in some networks
    if (process.env.MONGO_URI?.includes("mongodb+srv://")) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }

    const MONGO_URI =
      process.env.MONGO_URI ||
      "mongodb://campus_admin:campus%40123@cluster0.dtk2vws.mongodb.net/?retryWrites=true&w=majority";

    const conn = await mongoose.connect(MONGO_URI, {
      dbName: "campusconnect",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("MONGO DB:", conn.connection.db.databaseName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;