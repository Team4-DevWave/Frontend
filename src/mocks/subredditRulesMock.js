const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4004;

app.use(cors());
app.use (express.json());
let subredditsRules = require('./subredditRules.json');

// Route to get list of subreddits

app.get ('/api/subreddits/:subredditId/rules', (req, res) => {
    const subredditId = req.params.subredditId;
    const rules = subredditsRules.filter(subreddit => subreddit.id === subredditId);
    if (rules.length > 0) {
        res.json(rules);
    } else {
        res.json({ message: 'No rules found for this subreddit' });
    }
});

//update the rules of a subreddit
app.put('/api/subreddits/:subredditId/rules', (req, res) => {
    const subredditId = req.params.subredditId;
    const newRules = req.body;
    console.log(newRules);
const subredditIndex = subredditsRules.findIndex(subreddit => subreddit.id === subredditId);
if (subredditIndex !== -1) {
    subredditsRules[subredditIndex].rules = newRules. updatedRules;
    res.json({ message: 'Rules updated' });
}


});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});
