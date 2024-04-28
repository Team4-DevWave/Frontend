import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Button, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';

function ModerationRoles() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [username, setNames] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/api/subreddits')
            .then(response => {
                setSubreddits(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedSubreddit) {
            const url = `http://localhost:4003/api/subreddits/${selectedSubreddit.id}/usernames`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setNames(data[0].users);
                })
        }
    }, [selectedSubreddit]);

    const handleInvite = () => {
        // Handle the invite action here
    };

    const handleLeave = () => {
        // Handle the leave action here
    };

    return (
        <Box p={2}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4">Selected Subreddit: {selectedSubreddit ? selectedSubreddit.name : 'None'}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Select your Subreddit please</Typography>
                    <Select
                        value={selectedSubreddit ? selectedSubreddit.id : ''}
                        onChange={(event) => {
                            const subredditId = event.target.value;
                            const selectedSubreddit = subreddits.find(subreddit => subreddit.id === subredditId);
                            setSelectedSubreddit(selectedSubreddit);
                        }}
                        title={selectedSubreddit ? selectedSubreddit.name : 'None'}
                    >
                        {subreddits.map((subreddit) => (
                            <MenuItem key={subreddit.id} value={subreddit.id}>
                                {subreddit.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Select a user to invite for moderation</Typography>
                    <Select
                        value={selectedUser}
                        onChange={(event) => {
                            setSelectedUser(event.target.value);
                        }}
                    >
                        {username.map((user) => (
                            <MenuItem key={user.username} value={user.username}>
                                {user.username}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleInvite}>Invite for moderation</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleLeave}>Leave moderator role</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ModerationRoles;