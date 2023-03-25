// This is an Express router that defines the endpoints for User related routes.
const express = require("express");
const { GetAllTask, PostTask, UpdateTask, DELTETASK } = require("../Controller/TaskController");
const router = express.Router();

// Route for Get the sprint data
router.get('/', GetAllTask)

// Route for post the sprint data
router.post('/', PostTask)

//Route for update the sprint data
router.patch('/:taskID',UpdateTask )

//Route for Delete the sprint data
router.delete('/:taskID', DELTETASK)

// Export the router to use in the main app.js file
module.exports = router;