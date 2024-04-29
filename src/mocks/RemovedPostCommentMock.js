const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises; // Use promises version of fs
const path = require('path');

const app = express();
const PORT = 4001;

app.use(cors());

// Mock data for removed post/ comments from RemovedPostCommentDB.json
let removedPosts = require('./RemovedPostCommentDB.json');

// Update removedpost every 0.5 seconds
// Update removedpost every 0.5 seconds
// setInterval(async function () {
//     try {
//         const data = await fs.readFile(path.join(__dirname, './RemovedPostCommentDB.json'), 'utf8');
//         removedPosts = data ? JSON.parse(data) : { removed: [] }; // default value if file is empty
//     } catch (error) {
//         console.error(`Failed to read file: ${error}`);
//     }
// }, 500);

// Route to get list of removed posts
app.get('/api/subreddits/:subredditId/removedPosts', (req, res) => {
    const subredditId = req.params.subredditId;
    const posts = removedPosts.removed.filter(post => post.subredditId === subredditId);
    if (posts.length > 0) {
        res.json(posts);
    } else {
        res.status(404).json({ message: 'No posts found for this subreddit' });
    }
});

app.patch('/api/subreddits/:subredditId/removedPosts/:postId/removedstatus', async (req, res) => {
    const subredditId = req.params.subredditId;
    const postId = req.params.postId;
    const postIndex = removedPosts.removed.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        // Update the post data in memory
        removedPosts.removed[postIndex].removedstatus = true;
        removedPosts.removed[postIndex].spamstatus = true;
        removedPosts.removed[postIndex].status = 'approved';
        console.log(removedPosts.removed[postIndex]);

        // Write the updated data to the JSON file
        app.patch('/api/subreddits/:subredditId/removedPosts/:postId/removedstatus', async (req, res) => {
            const subredditId = req.params.subredditId;
            const postId = req.params.postId;
            const postIndex = removedPosts.removed.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                // Update the post data in memory
                removedPosts.removed[postIndex].removedstatus = true;
                removedPosts.removed[postIndex].spamstatus = true;
                removedPosts.removed[postIndex].status = 'approved';

                // Write the updated data to the JSON file
                const updatedData = JSON.stringify(removedPosts, null, 2);
                console.log('Writing the following data to the file:', updatedData);
                await fs.writeFile(path.join(__dirname, './RemovedPostCommentDB.json'), updatedData, 'utf8');
                console.log('Data written to file successfully');
                res.json('success');
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        });

        app.patch ('/api/subreddits/:subredditId/removedPosts/:postId/removedstatusdisapprove', async (req, res) => {
            const subredditId = req.params.subredditId;
            const postId = req.params.postId;
            const postIndex = removedPosts.removed.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                // Update the post data in memory
                removedPosts.removed[postIndex].removedstatus = false;
                removedPosts.removed[postIndex].spamstatus = true;
                removedPosts.removed[postIndex].status = 'disapproved';

                // Write the updated data to the JSON file
                const updatedData = JSON.stringify(removedPosts, null, 2);
                console.log('Writing the following data to the file:', updatedData);
                await fs.writeFile(path.join(__dirname, './RemovedPostCommentDB.json'), updatedData, 'utf8');
                console.log('Data written to file successfully');
                res.json(removedPosts.removed[postIndex]);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.patch ('/api/subreddits/:subredditId/removedPosts/:postId/removedstatusdisapprove', async (req, res) => {
    const subredditId = req.params.subredditId;
    const postId = req.params.postId;
    const postIndex = removedPosts.removed.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        // Update the post data in memory
        removedPosts.removed[postIndex].removedstatus = false;
        removedPosts.removed[postIndex].spamstatus = true;
        removedPosts.removed[postIndex].status = 'disapproved';

        // Write the updated data to the JSON file
        const updatedData = JSON.stringify(removedPosts, null, 2);
        await fs.writeFile(path.join(__dirname, './RemovedPostCommentDB.json'), updatedData, 'utf8');
        res.json(removedPosts.removed[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});