const express = require('express');
const https = require('https');
const router = express.Router();
let jwtmiddleware =  require('../middleware/authMiddleware');

router.get('/quote',jwtmiddleware, (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
        path: '/quote?token=ipworld.info',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
        },
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', chunk => data += chunk);
        response.on('end', () => {
            try {
                res.json({
                    detail: 'Quote of the Day',
                    data: JSON.parse(data),
                });
            } catch {
                res.status(500).json({ error: 'Invalid JSON response from API' });
            }
        });
    });

    request.on('error', err => res.status(500).json({ error: err.message }));
    request.end();
});

module.exports = router;
