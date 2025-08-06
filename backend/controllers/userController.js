// /backend/controllers/userController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// --- NEW AND IMPROVED registerUser FUNCTION ---
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Basic Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    try {
        // 2. Check for duplicate username
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            // Send a specific error for the username field
            return res.status(400).json({ errors: { username: 'This username is already taken.' } });
        }

        // 3. Check for duplicate email
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            // Send a specific error for the email field
            return res.status(400).json({ errors: { email: 'This email is already registered.' } });
        }

        // 4. If all checks pass, create the new user
        const user = await User.create({ username, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

const loginUser = async (req, res) => {
    // ... your loginUser function remains the same
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, loginUser };