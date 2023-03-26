const express = require("express");
const TaskModel = require("../Model/Task.model");
const Task = require("../Model/Task.model");

// Create a router for the task routes
const taskRouter = express.Router();

// GET all tasks for a user
exports.GetAllTask = async (req, res) => {
    const userID = req.body.userID;
    try {
        const task = await Task.find({ userID });
        if (task) {
            return res.status(200).send({ task, message: "All task get suceesfully" });
        }
    } catch (error) {
        return res.status(401).send(error.message);
    }
};

// POST a new task
exports.PostTask = async (req, res) => {
    const payload = req.body;
    // TODO: Implement token verification using JWT
    try {
        const newTask = await Task.create(payload);
        return res.status(200).send({ message: "Task added successfully", task: newTask });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
};

// PATCH a task by ID
exports.UpdateTask = async (req, res) => {
    const { taskID } = req.params;
    const { userID } = req.body;
    try {

        const task = await TaskModel.findById(taskID);
       
        if (userID !== task.userID) {
            return res.status(403).json({ err: "Not authorized" });
        } else {
            const updatedtask = await TaskModel.findByIdAndUpdate(
                taskID,
                req.body,
                { new: true }
            );
            // let temp = await (TaskModel.findById(taskID));
            return res.status(200).send({ message: "task updated successfully", task: updatedtask });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

// DELETE a task by ID
exports.DELTETASK = async (req, res) => {
    const { taskID } = req.params;

    const { userID } = req.body;

    // Find the task in the database by ID
    const task = await TaskModel.findById(taskID);

    // If the user ID does not match the task's userID, return an error message
    if (userID !== task.userID) {
        return res.status(401).send({ message: "Not authorized" });
    } else {
        // Otherwise, delete the task from the database
        await TaskModel.findByIdAndDelete(taskID);

        // Return a success message as a JSON response
        return res.status(200).send({ message: "task deleted successfully" });
    }
};

