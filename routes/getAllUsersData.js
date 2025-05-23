const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.get('/GetAllUsers', async (req, res) => {
    console.log('here i am getAllUsers');
    try {
        let user = await User.find().select('-password');
        res.json({user});
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;