import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Card, CardContent, CardActions, CheckCircleOutline } from '@mui/material';
import PropTypes from 'prop-types';
import './Removed.css';
import PostContainer2 from "../PostCointainer2";

function Unmoderated() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [removedPosts, setRemovedPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState({}); // New state

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
            axios.get(`http://localhost:4001/api/subreddits/${selectedSubreddit.id}/removedPosts`)
                .then(response => {
                    setRemovedPosts(response.data);
                });
        }
    }, [selectedSubreddit]);

    const handleApprove = (postId) => {
        // Approve the post
        axios.patch (`http://localhost:4001/api/subreddits/${selectedSubreddit.id}/removedPosts/${postId}/removedstatus`, { removedstatus: true })
            .then(response => {

            });
        //then update the state
        axios.get(`http://localhost:4001/api/subreddits/${selectedSubreddit.id}/removedPosts`)
            .then(response => {
                setRemovedPosts(response.data);
            });
    };

    const handleDisapprove = (postId) => {
        // Disapprove the post
        axios.patch (`http://localhost:4001/api/subreddits/${selectedSubreddit.id}/removedPosts/${postId}/removedstatusdisapprove`, { removedstatus: false })
            .then(response => {
                const updatedPosts = removedPosts.map(post => {
                    if (post.id === postId) {
                        return response.data;
                    }
                    return post;
                });
                setRemovedPosts(updatedPosts);
            });
    };

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
            {removedPosts.filter(post => post.spamstatus === false && post.removedstatus === false && post.type =='post'
            ).map((post)=>  (
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
                    <CardActions style={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" color="primary" onClick={() => handleApprove(post.data.id)}>Remove</Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDisapprove(post.data.id)}>Approve</Button>
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
                    <CardActions style={{justifyContent: 'flex-end'}}>
                        <Button variant="contained" color="primary" onClick={() => handleApprove(post.data.id)}>Remove</Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDisapprove(post.data.id)}>Approve</Button>
                    </CardActions>
                </Card>
            ))
            }

        </div>
    );
}


Unmoderated.propTypes = {};

export default Unmoderated;