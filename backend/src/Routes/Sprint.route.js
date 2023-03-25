// This is an Express router that defines the endpoints for User related routes.
const express = require("express");
const { GetSprintData, PostSprintData, UpdateSprintData, DELETESPRINT } = require("../Controller/SprintController");
const router = express.Router();

// Route for Get the sprint data
router.get('/', GetSprintData)

// Route for post the sprint data
router.post('/', PostSprintData)

//Route for update the sprint data
router.patch('/:sprintID', UpdateSprintData)

//Route for Delete the sprint data
router.delete('/:sprintID', DELETESPRINT)

// Export the router to use in the main app.js file
module.exports = router;