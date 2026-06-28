const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    if (process.env.MONGO_URI.includes("mongodb+srv://")) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected:", conn.connection.host);

  } catch (error) {
  console.error("========== MongoDB Error ==========");
  console.error(error);
  process.exit(1);
}
};

module.exports = connectDB;