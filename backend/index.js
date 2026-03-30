const express = require('express');
const cors = require('cors');
require('dotenv').config();
const notionRouter = require('./routes/notion.js');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api', notionRouter)

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Focus API running on http://localhost:${PORT}`);
});
