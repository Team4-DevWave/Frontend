import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Card, CardContent, Typography, CardHeader, Avatar, IconButton, Box, List, ListItem, ListItemText, Divider, Menu, TextareaAutosize } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";


function CommunitySettings() {
    const [subreddits, setSubreddits] = useState([]);
    const [selectedSubreddit, setSelectedSubreddit] = useState('');
    const [settings, setSettings] = useState({
        name: '',
        description: '',
        welcomeMessage: '',
        communityType: '',
        is18Plus: false,
        acceptRequests: false
    });
    const settingsDescriptions = {
        name: 'The name of your community. This is how users will identify your community on the platform.',
        description: 'A brief description of your community. This will be shown to users when they visit your community page.',
        welcomeMessage: 'A message that will be shown to new members of your community. This is a good place to set the tone for your community and lay out any rules or guidelines.',
        communityType: 'The type of your community. This determines who can view and participate in your community.',
        is18Plus: 'Whether your community is restricted to users who are 18 years old or older.',
        acceptRequests: 'Whether your community is currently accepting requests to join.'
    };
    const communityTypes = ['Public', 'Private', 'Restricted']; // Add your community types here



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
        console.log(selectedSubredditId);
        // Fetch the settings for the selected subreddit
        axios.get(`http://localhost:4007/api/communitysettings/${selectedSubredditId}`)
            .then(response => {
                if (typeof response.data.acceptRequests === 'string') {
                    response.data.acceptRequests = response.data.acceptRequests === 'true';
                }
                if (typeof response.data.welcomeMessage === 'string') {
                    response.data.welcomeMessage = response.data.welcomeMessage === 'true';
                }
                setSettings(response.data);
            })
            .catch(error => {
                console.error('Error fetching settings:', error);
            });
    };

    const handleUpdate = () => {
        // Update the settings for the selected subreddit
        axios.put(`http://localhost:4007/api/communitysettings/${selectedSubreddit}`, settings)
            .then(response => {
                console.log('Settings updated');
            });
    };

    return (

        <Box sx={{ display: 'flex', p: 1, backgroundColor: '#f5f5f5' }}> {/* Add a background color */}
            <Box sx={{ width: '30%', bgcolor: 'white', p: 1, borderRight: '1px solid grey', borderRadius: '5px' }}> {/* Add border radius */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="subreddit-select-label">Select Subreddit</InputLabel>
                    <Select
                        labelId="subreddit-select-label"
                        value={selectedSubreddit}
                        onChange={handleSubredditChange}
                    >
                        {subreddits.map((subreddit) => (
                            <MenuItem key={subreddit.id} value={subreddit.id}>
                                {subreddit.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ width: '70%', bgcolor: 'white', p: 1, borderRadius: '5px' }}> {/* Add border radius */}
                <List>
                    {Object.keys(settings).map((settingKey) => (
                        <ListItem key={settingKey}>
                            <ListItemText
                                primary={settingKey}
                                secondary={settingsDescriptions[settingKey]}
                            />
                            {settingKey === 'communityType' ? (
                                <Select
                                    label={settingKey}
                                    value={settings[settingKey]}
                                    onChange={(event) => setSettings({ ...settings, [settingKey]: event.target.value })}
                                    sx={{ m: 1, width: '25ch' }}
                                >
                                    {communityTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : settingKey === 'NSFW' || settingKey === 'welcomeMessage' || settingKey === 'acceptrequests' ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={settings[settingKey]}
                                            onChange={(event) => setSettings({ ...settings, [settingKey]: event.target.checked })}
                                            name={settingKey}
                                            color="primary"
                                        />
                                    }
                                    label={settingKey}
                                />
                            ) : (
                                <TextField
                                    label={settingKey}
                                    value={settings[settingKey]}
                                    onChange={(event) => setSettings({ ...settings, [settingKey]: event.target.value })}
                                    sx={{ m: 1, width: '25ch' }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
                <Button onClick={handleUpdate} sx={{ m: 1, backgroundColor: '#0079d3', color: 'white' }}>Update</Button> {/* Add custom styles to the button */}
            </Box>
        </Box>


    );
}

export default CommunitySettings;