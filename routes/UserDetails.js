const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // adjust path as needed
const router = express.Router();


// GET user details from token (no shared middleware used)
router.get('/UserDetails', async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token', error: err.message });
    }
});

module.exports = router;
