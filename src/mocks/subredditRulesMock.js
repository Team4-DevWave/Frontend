const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4004;

app.use(cors());
let subredditsRules = require('./subredditRules.json');

// Route to get list of subreddits

app.get ('/api/subreddits/:subredditId/rules', (req, res) => {
    const subredditId = req.params.subredditId;
    const rules = subredditsRules.subredditrules.filter(subreddit => subreddit.id === subredditId);
    if (rules.length > 0) {
        res.json(rules);
    } else {
        res.status(404).json({ message: 'No rules found for this subreddit' });
    }
});

//update the rules of a subreddit
app.put('/api/subreddits/:subredditId/rules', (req, res) => {
    const subredditId = req.params.subredditId;
    const rules = req.body;
    const index = subredditsRules.subredditrules.findIndex(subreddit => subreddit.subredditid === subredditId);
    if (index !== -1) {
        subredditsRules.rules[index] = rules;
        res.json(rules);
    } else {
        res.status(404).json({ message: 'No rules found for this subreddit' });
    }

});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});
