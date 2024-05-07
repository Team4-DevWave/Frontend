const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // Use promises version of fs
const path = require('path');

const app = express();
const PORT = 4003;

app.use(cors());

// Mocck data foe subredditsusernames from SubredditsusernamesMock.json
let subreddits = require('./subredditsUsers.json');

// Route to get list of usernames of specific subreddit
app.get('/api/subreddits/:subredditId/usernames', (req, res) => {
    const subredditId = req.params.subredditId;
    const usernames = subreddits.subredditsusers.filter(subreddit => subreddit.subbredditid === subredditId);
    if (usernames.length > 0) {
        res.json(usernames);
    } else {
      res.json({message: "No usernames found"});
    }
});

//begin server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});