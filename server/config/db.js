const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://campus_admin:campus%40123@cluster0.dtk2vws.mongodb.net/?campusconnect=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("MONGO DB:", conn.connection.db.databaseName);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
