const express = require('express');
const router = express.Router();
let jwtmiddleware = require('../middleware/authMiddleware');

const { GoogleGenerativeAI } = require('@google/generative-ai');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Use the correct model name

router.post('/gemini', jwtmiddleware , async (req, res) => {
    const { prompt } = req.body;

    // Basic validation
    if (!prompt) {
        return res.status(400).json({ msg: 'Prompt is required in the request body.' });
    }

    try {

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ Gemini:true,text: text }); // Send the generated text in the response

    } catch (err) {
        console.error('Error using Gemini API:', err); // Log the error for debugging
        res.status(500).json({ msg: 'Error generating text with Gemini API', error: err.message });
    }
});

module.exports = router;