// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('✅ Server is running!');
});
// API Routes (all under /api/*)
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const quoteRoutes = require('./routes/qoute'); // keep filename typo-consistent
const geminiRoutes = require('./routes/gemini');
const GetAllUsers = require('./routes/getAllUsersData');
app.use('/api', authRoutes);
app.use('/api', weatherRoutes);
app.use('/api', quoteRoutes);
app.use('/api', geminiRoutes);
app.use('/api', GetAllUsers);
// Start the server

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();