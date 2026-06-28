const dotenv = require('dotenv');
dotenv.config();

const express = require("express"); 
const app = express();


const connectDB = require('./config/db');
//const app = require('./app');

// Load environment variables


// Connect to Database
connectDB();

//Middleware
app.use(express.json());


//Routes
const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api/favorites", favoriteRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
