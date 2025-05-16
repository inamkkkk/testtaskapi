const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.get('/GetAllUsers', async (req, res) => {
    console.log(req.body);
    const { email, password , name } = req.body;
    try {
        let user = await User.find();
        res.json({ Users: user});
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;