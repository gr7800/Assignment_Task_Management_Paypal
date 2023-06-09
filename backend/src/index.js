// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require('express');
const connectDB = require('./Configuration/db');
const cors = require('cors');

// Set port number
const PORT = process.env.PORT || 8080;

// Create an instance of express
const app = express();

// Import routes
const UserRoutes = require('./Routes/User.route');
const SprintRoutes=require("./Routes/Sprint.route");
const TaskRoutes=require("./Routes/Task.route");

// Import middleware for protecting routes
const AuthenticationMedilware = require('./Middleware/Authentication.Middleware');

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/user', UserRoutes);
app.use(AuthenticationMedilware); // Middleware for protecting routes
app.use('/sprint', SprintRoutes);
app.use('/task',TaskRoutes)


// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
});
  } catch (error) {
    console.log(error);
  }
}

// Start the server
startServer();