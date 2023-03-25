// This is an Express router that defines the endpoints for User related routes.
const express = require("express");
const router = express.Router();
const { SignupController, LoginController } = require('../Controller/UserController')

// Route for User Signup
router.post('/signup', SignupController)

// Route for User Login
router.post('/login', LoginController)

// Export the router to use in the main app.js file
module.exports = router;