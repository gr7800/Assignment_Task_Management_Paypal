// Import the User model and required libraries
const UserModel = require('../Model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login controller
exports.LoginController = async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;
    try {
        // Find a user with the provided email in the database
        const userpersent = await UserModel.findOne({ email:req.body.email });
        console.log(userpersent)
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        // Check if the password provided matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, userpersent.password);
        if (!isPasswordCorrect) {
            // If the password does not match, send a 401 Unauthorized status code
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        // If the email and password are correct, create a JWT token and send it to the client
        const token = jwt.sign(
            {
                "userID": userpersent._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // Send a success response with the tokens and user data
        return res.status(200).send({ token, userpersent, message: 'Login successful' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// Signup controller
exports.SignupController = async (req, res) => {
    // Extract name, email, and password from request body
    const {name, email, password } = req.body;
    try {
        // Check if a user with the provided email already exists in the database
        const exsistinguser = await UserModel.findOne({ email });
        if (exsistinguser) {
            // If a user already exists, send a 409 Conflict status code
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        // Hash the password and create a new user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name:name,
            email:email,
            password: hashedPassword,
        });
        // Send a success response with the newly created user data
        return res.status(201).send({
            user: newUser,
            message: 'Congratulation,User has been signup successfully',
        });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

