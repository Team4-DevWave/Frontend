const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // Use promises version of fs
const path = require('path');

const app = express();
const PORT = 4007;
app.use(cors());
let communitySettings = require('./CommunitySettingsdb.json');

// Route to get list of community settings
app.get('/api/communitysettings/:subredditId', (req, res) => {
    const subredditId = req.params.subredditId;
    const settings = communitySettings.CommunitySettings.filter(subreddit => subreddit.id === subredditId);
    if (settings.length > 0) {
        res.json(settings[0]);
    } else {
        res.json({ message: 'No settings found for this subreddit' });
    }
});

// update the community settings of subreddit using id
app.put('/api/communitysettings/:subredditId', (req, res) => {
    const subredditId = req.params.subredditId;
    const settings = req.body;
    console.log(settings);
    const index = communitySettings.CommunitySettings.findIndex(subreddit => subreddit.id === subredditId);
    console.log(index);
    if (index !== -1) {
        communitySettings.CommunitySettings[index] = settings;
        console.log(communitySettings);
        res.json(settings);
    } else {
        res.status(404).json({ message: 'No settings found for this subreddit' });
    }

});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});

