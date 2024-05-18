import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Card, CardContent, CardActions, CheckCircleOutline } from '@mui/material';
import PropTypes from 'prop-types';
import './Removed.css';
import PostContainer2 from "../PostCointainer2";

function Removed() {
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
            {removedPosts.filter(post =>  post.removedstatus === true && post.type =='post'
            ).map((post)=>  (
                <Card key={post.id} className={'unmoderated'}>
                    <CardContent>
                        <PostContainer2 postData={post.data.post} />
                        <p>
                            by username  {post.user.name}
                        </p>

                        <h6>spam reason of post:</h6>
                        <p>
                            {post.reason}
                        </p>
                    </CardContent>
                </Card>
            ))}


            {/*    for comments*/}
            {removedPosts.filter(post =>  post.removedstatus === true && post.type =='comment'
            ).map((post)=>  (
                <Card key={post.id} className={'unmoderated'}>
                    <CardContent>
                        <PostContainer2 postData={post.data.comment} />
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

                </Card>
            ))
            }

        </div>
    );
}




export default Removed;


Removed.prototype = {
    subreddits: PropTypes.array,
    selectedSubreddit: PropTypes.object,
    removedPosts: PropTypes.array,
    approvedPosts: PropTypes.object

}