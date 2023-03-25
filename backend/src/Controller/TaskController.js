const express = require("express");
const Task = require("../Model/Task.model");

// Create a router for the task routes
const taskRouter = express.Router();

// GET all tasks for a user
exports.GetAllTask = async (req, res) => {
    const userID = req.body.userID;
    try {
        const tasks = await Task.find({ userID });
        if (tasks) {
            return res.status(200).send({ tasks, message: "All task get suceesfully" });
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
    const taskId = req.params.taskId;
    const userID = req.body.userID;
    const task = await Task.findById(taskId);
    if (userID !== task.userID) {
        return res.status(401).send("Not authorized");
    } else {
        try {
            const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
                new: true,
            });
            res.send({
                msg: "Task updated successfully",
                task: updatedTask,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ err: "Something went wrong" });
        }
    }
};

// DELETE a task by ID
exports.DELTETASK = async (req, res) => {
    const taskId = req.params.taskId;
    const userID = req.body.userID;
    const task = await Task.findById(taskId);
    if (userID !== task.userID) {
        return res.status(401).send("Not authorized");
    } else {
        try {
            await Task.findByIdAndDelete(taskId);
            return res.status(200).send({ msg: "Task deleted successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ err: "Something went wrong" });
        }
    }
};

