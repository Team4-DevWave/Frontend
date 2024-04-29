const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // Use promises version of fs
const path = require('path');

const app = express();
const PORT = 4002;

app.use(cors());

//mock data for edited post/ comments from EditedPostCommentDB.json
let editedPosts = require('./EditedPostComments.json');


// Route to get list of edited posts
app.get('/api/subreddits/:subredditId/editedPosts', (req, res) => {
    const subredditId = req.params.subredditId;
    const posts = editedPosts.removed.filter(post => post.subredditId === subredditId);
    if (posts.length > 0) {
        res.json(posts);
    } else {
        res.status(404).json({ message: 'No posts found for this subreddit' });
    }
});


//begin server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});