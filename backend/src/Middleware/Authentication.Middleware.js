// This is a middleware function that checks if a user is authorized to access a certain resource.
const jwt = require("jsonwebtoken")
require('dotenv').config();
module.exports = async (req, res, next) => {
    try {
        // Retrieve the token from the request headers.
        const token = req.headers["authorization"];
        console.log(token);
        // If the token is present, decode it.
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded) {
                const userID = decoded.userID
                req.body.userID = userID
                next()
            }
            else {
                return res.send("Please Log-In First")
            }
        }
        else {
            return res.send("Please Log-In First")
        }
    }
    catch (error) {
        // If there's an error during the authorization process, return a 404 (Not Found) error.
        return res.status(404).send(error.message);
    }
}