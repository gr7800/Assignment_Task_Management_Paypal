// Import the Mongoose library
const mongoose = require("mongoose")

// Define the schema for the Sprint model
const sprintSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  startDate: { type: String },
  targetDate: { type: String },
  users: [],
  status: { type: Boolean, default: false },
  userID: { type: String },
})

// Create a Mongoose model for the Sprint schema and export
module.exports = mongoose.model("Sprint", sprintSchema)
