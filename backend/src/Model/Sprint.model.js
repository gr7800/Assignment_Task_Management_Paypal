// Import the Mongoose library
const mongoose = require("mongoose")

// Define the schema for the Sprint model
const sprintSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  targetDate: { type: String, required: true },
  users:[],
  status: { type: Boolean, default: false },
  userID: { type: String, required: true },
})

// Create a Mongoose model for the Sprint schema and export
module.exports = mongoose.model("Sprint", sprintSchema)
