const mongoose = require("mongoose");

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  assign: { type: String, required: true },
  startDate: { type: String, required: true },
  targetDate: { type: String, required: true },
  status: { type: String, required: true },
  userID: { type: String, required: true },
  sprintID: { type: String, required: true },
});

// Create a model for the task schema and export
module.exports = mongoose.model("Task", taskSchema);
