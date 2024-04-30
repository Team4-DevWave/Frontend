import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Card, CardContent, CardActions, CheckCircleOutline, Menu } from '@mui/material';
import PropTypes from 'prop-types';
import './Removed.css';
import PostContainer2 from "../PostCointainer2";

function Edited() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [removedPosts, setRemovedPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState({}); // New state
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        // Fetch the list of subreddits
        axios.get('http://localhost:4000/api/subreddits')
            .then(response => {
                setSubreddits(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedSubreddit) {
            // Fetch the removed posts from the selected subreddit
            axios.get(`http://localhost:4002/api/subreddits/${selectedSubreddit.id}/editedPosts`)
                .then(response => {
                    setRemovedPosts(response.data);
                });
        }
    }, [selectedSubreddit]);


    return (
        <div>
            <table>
                <tr>
                    <td>
                        <h4 className={'h4'}>Select your Subreddit please</h4>
                    </td>
                    <td>
                        <h4> <Select
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


                        </h4>
                    </td>
                </tr>
            </table>
            {removedPosts.filter(post =>  post.type =='post')
                .map((post)=>  (
                <Card key={post.id} className={'unmoderated'}>
                    <CardContent>
                        <h2>
                            {post.data.post.title}
                        </h2>
                        <p>
                            {post.data.post.content}
                        </p>
                        <p>
                            by username  {post.user.name}
                        </p>

                        <h6>spam reason of post:</h6>
                        <p>
                            {post.reason}
                        </p>
                    </CardContent>
                        <CardActions>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Show Edits
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {post.edits.map((edit, index) => (
                                    <MenuItem onClick={handleClose} key={index}>
                                        Reason: {edit.reason}, Status: {edit.status}, Date: {edit.date}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </CardActions>
                </Card>
            ))}



            {/*    for comments*/}
            {removedPosts.filter(post => post.spamstatus === false && post.removedstatus === false && post.type =='comment'
            ).map((post)=>  (
                <Card key={post.id} className={'unmoderated'}>
                    <CardContent>
                        <h2>
                            {post.data.comment.content}
                        </h2>
                        <p>
                            {post.data.comment.content}
                        </p>
                        <p>
                            by username  {post.user.name}
                        </p>

                        <h6>spam reason of comment:</h6>
                        <p>
                            {post.reason}
                        </p>
                    </CardContent>
                    <CardActions>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Show Edits
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {post.edits.map((edit, index) => (
                                <MenuItem onClick={handleClose} key={index}>
                                    Reason: {edit.reason},Edit:{edit.edited} ,Status: {edit.status}, Date: {edit.date}
                                </MenuItem>
                            ))}
                        </Menu>
                    </CardActions>

                </Card>
            ))
            }

        </div>
    );
}


Edited.propTypes = {};

export default Edited;