import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Button,
    Select,
    MenuItem,
    Card,
    CardContent,
    CardActions,
    CardHeader,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import './Removed.css';

function CommunityRules() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [rules, setRules] = useState([]);
    const [open, setOpen] = useState(false);
    const [newRule, setNewRule] = useState({rule: '', description: ''});

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
                const subreddit = response.data[0].rules;
                console.log('subbreddit fetch', subreddit);
                if (subreddit) {
                    // Set the rules array in the state
                    setRules(subreddit);
                    console.log(subreddit);
                }
            });
    };
    const handleRulesChange = (event) => {
        setRules(event.target.value);
    };

    const handleUpdateClick = () => {
        // Update the rules for the selected subreddit
        axios.put(`http://localhost:4004/api/subreddits/${selectedSubreddit}/rules`, {rules})
            .then(response => {
                console.log('Rules updated');
            });
    };
    const handleAddClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveClick = () => {
        // Update the local state


        if (newRule.rule.trim() === '' || newRule.description.trim() === '') {
            alert('Rule and description cannot be empty');
            return;
        }
        const updatedRules = [...rules, newRule];
        setRules(updatedRules);
        //modifying the shape of response tob elike {updatedRules}


        console.log('updated rules', updatedRules)
        setNewRule({rule: '', description: ''});
        setOpen(false);

        // Make a PUT request to update the rules on the server
        axios.put(`http://localhost:4004/api/subreddits/${selectedSubreddit}/rules`, {updatedRules})
            .then(response => {
                console.log('Rules updated on server');
            })
            .catch(error => {
                console.error('Error updating rules on server:', error);
            });
    };

    const handleRuleChange = (event) => {
        setNewRule({...newRule, rule: event.target.value});
    };

    const handleDescriptionChange = (event) => {
        setNewRule({...newRule, description: event.target.value});
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
                    {console.log('rendering rule ', rules)}
                    {rules.map((rule, index) => (
                        <Card key={index} style={{
                            margin: '10px 0'

                        }}>
                            <CardHeader title={rule.rule}/>
                            <CardContent>
                                <p>{rule.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                    <Button onClick={handleAddClick}>Add Rule</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add New Rule</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter the rule and its description.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Rule"
                                fullWidth
                                value={newRule.rule}
                                onChange={handleRuleChange}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                value={newRule.description}
                                onChange={handleDescriptionChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSaveClick}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}

export default CommunityRules;