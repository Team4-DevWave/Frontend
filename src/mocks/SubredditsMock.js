const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

// Mock data for subreddits
const subreddits = [
    {
        id: 1,
        name: 'r/aww'
    },
    {
        id: 2,
        name: 'r/funny'
    },
    {
        id: 3,
        name: 'r/pics'
    }
];

// Route to get list of subreddits
app.get('/api/subreddits', (req, res) => {
    res.json(subreddits);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});