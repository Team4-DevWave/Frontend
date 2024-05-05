import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Card, CardContent, CardActions, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import './Removed.css';

function CommunityRules() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [rules, setRules] = useState('');

    useEffect(() => {
        // Fetch the list of subreddits
        axios.get('http://localhost:4000/api/subreddits')
            .then(response => {
                setSubreddits(response.data);
            });
    }, []);

    const handleSubredditChange = (event) => {
        const selectedSubredditId = Number(event.target.value);
        setSelectedSubreddit(selectedSubredditId);
        // Fetch the rules for the selected subreddit
        axios.get(`http://localhost:4004/api/subreddits/${selectedSubredditId}/rules`)
            .then(response => {
                // Find the subreddit object in the response
                const subreddit = response.data.find(sub => sub.id === selectedSubredditId);
                if (subreddit) {
                    // Join the rules array into a single string with line breaks between each rule
                    const rulesString = subreddit.rules.join('\n');
                    setRules(rulesString);
                }
            });
    };
    const handleRulesChange = (event) => {
        setRules(event.target.value);
    };

    const handleUpdateClick = () => {
        // Update the rules for the selected subreddit
        axios.put(`http://localhost:4004/api/subreddits/${selectedSubreddit}/rules`, { rules })
            .then(response => {
                console.log('Rules updated');
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
                        <Select
                            value={selectedSubreddit}
                            onChange={handleSubredditChange}
                        >
                            {subreddits.map((subreddit) => (
                                <MenuItem key={subreddit.id} value={subreddit.id}>
                                    {subreddit.name}
                                </MenuItem>
                            ))}
                        </Select>

                    </td>
                </tr>
            </table>
            <Card>
                <CardContent>
                    <TextField
                        label="Rules"
                        multiline
                        rows={4}
                        value={rules}
                        onChange={handleRulesChange}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={handleUpdateClick}>Update</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CommunityRules;