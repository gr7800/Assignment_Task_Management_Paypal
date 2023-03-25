const express = require("express");
const  SprintModel  = require("../Model/Sprint.model");

// Create a new instance of the Express router

// Login controller
exports.GetSprintData = async (req, res) => {
    // Extract the user ID from the request body
    const userID = req.body.userID;

    // Use Mongoose to find all Sprints for the specified user ID
    const sprints = await SprintModel.find({ userID });

    // Return the list of Sprints as a JSON response
    return res.status(200).send({ sprints: sprints, message: 'Data accessed Successfully' });

};


exports.PostSprintData = async (req, res) => {
    // Extract the Sprint data from the request body
    const payload = req.body;

    // TODO: Get the user token from the request header and verify it using JWT

    try {
        // Create a new instance of the Sprint model with the payload data
        const newSprint = new SprintModel(payload);

        // Save the new Sprint to the database
        await newSprint.save();

        // Return a success message as a JSON response
        return res.status(200).send({ message: "Sprint added successfully" });
    } catch (err) {

        // If there was an error, log it and return an error message as a JSON response
        console.log(err);
       return res.status(500).json({ err: "Something went wrong" });
    }
};

exports.UpdateSprintData= async (req, res) => {
    // Extract the Sprint ID and user ID from the request
    const { sprintID } = req.params;
    const { userID } = req.body;

    // Find the Sprint in the database by ID
    const sprint = await SprintModel.findById(sprintID);

    // If the user ID does not match the Sprint's userID, return an error message
    if (userID !== sprint.userID) {
        return res.status(403).json({ err: "Not authorized" });
    } else {
        // Otherwise, update the Sprint with the new data
        await SprintModel.findByIdAndUpdate(sprintID, req.body);

        // Return a success message as a JSON response
        return res.status(200).send({ message: "Sprint updated successfully" });
    }
};

exports.DELETESPRINT= async (req, res) => {
    // Extract the Sprint ID and user ID from the request
    const { sprintID } = req.params;
    const { userID } = req.body;

    // Find the Sprint in the database by ID
    const sprint = await SprintModel.findById(sprintID);

    // If the user ID does not match the Sprint's userID, return an error message
    if (userID !== sprint.userID) {
       return res.status(401).send({ message: "Not authorized" });
    } else {
        // Otherwise, delete the Sprint from the database
        await SprintModel.findByIdAndDelete(sprintID);

        // Return a success message as a JSON response
       return res.status(200).send({ message: "Sprint deleted successfully" });
    }
};
