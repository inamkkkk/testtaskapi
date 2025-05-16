require('dotenv').config();
const express = require('express');
const https = require('https');
const router = express.Router();
let  jwtmiddleware = require('../middleware/authMiddleware');

router.get('/weather', jwtmiddleware, (req, res) => {
    const city = req.query.city || 'bannu';

    const options = {
        method: 'GET',
        hostname: 'open-weather13.p.rapidapi.com',
        path: `/city?city=${encodeURIComponent(city)}&lang=EN`,
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const json = JSON.parse(data);
                res.json(json);
            } catch (error) {
                res.status(500).json({ error: 'Invalid response from weather API' });
            }
        });
    });

    request.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

    request.end();
});

module.exports = router;
