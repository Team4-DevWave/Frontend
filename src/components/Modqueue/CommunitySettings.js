import React, { useState,useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Card, CardContent, Typography } from '@mui/material';
import axios from "axios";
function CommunitySettings() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState(false);
    const [communityType, setCommunityType] = useState('');
    const [is18Plus, setIs18Plus] = useState(false);
    const [acceptRequests, setAcceptRequests] = useState(false);
    const [communitySettings, setCommunitySettings] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4006/api/communitysettings')
            .then(response => {
                setCommunitySettings(response.CommunitySettings);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    const handleUpdate = () => {
        // Update the community settings
    };

    return (
        <div>

            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Select the community  </Typography>
                    <Typography variant="body2">Choose your community and set the appropriate permissions.</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="community-name-label">Community Name</InputLabel>
                        <Select
                            labelId="community-name-label"
                            value={name}
                            onChange={(event) => {
                                const selectedCommunity = communitySettings.find(community => community.name === event.target.value);
                                setName(selectedCommunity.name);
                                setDescription(selectedCommunity.description);
                                setWelcomeMessage(selectedCommunity.welcomeMessage);
                                setIs18Plus(selectedCommunity.NSFW);
                                setAcceptRequests(selectedCommunity.acceptrequest);
                            }}
                        >
                            {communitySettings.map(community => (
                                <MenuItem key={community.id} value={community.name}>{community.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Community Name</Typography>
                    <Typography variant="body2">This is the name of your community.</Typography>
                    <TextField
                        label="Community name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        sx={{ m: 1, width: '25ch' }}
                    />
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Community Description</Typography>
                    <Typography variant="body2">This is how new members come to understand your community.</Typography>
                    <TextField
                        label="Community description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        inputProps={{ maxLength: 500 }}
                        sx={{ m: 1, width: '25ch' }}
                    />
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Welcome Message</Typography>
                    <Typography variant="body2">Choose whether to send a welcome message to new members.</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={welcomeMessage} onChange={(event) => setWelcomeMessage(event.target.checked)} />}
                        label="Send welcome message to new members"
                        sx={{ m: 1 }}
                    />
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Community Type</Typography>
                    <Typography variant="body2">Choose the type of your community and set the appropriate permissions.</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="community-type-label">Type of Community</InputLabel>
                        <Select
                            labelId="community-type-label"
                            value={communityType}
                            onChange={(event) => setCommunityType(event.target.value)}
                        >
                            <MenuItem value="public">Public</MenuItem>
                            <MenuItem value="restricted">Restricted</MenuItem>
                            <MenuItem value="private">Private</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">18+ Year Old Community</Typography>
                    <Typography variant="body2">Choose whether your community is for 18+ year olds.</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={is18Plus} onChange={(event) => setIs18Plus(event.target.checked)} />}
                        label="18+ year old community"
                        sx={{ m: 1 }}
                    />
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h6">Accepting Requests to Join</Typography>
                    <Typography variant="body2">Choose whether to accept requests to join your community.</Typography>
                    <FormControlLabel
                        control={<Checkbox checked={acceptRequests} onChange={(event) => setAcceptRequests(event.target.checked)} />}
                        label="Accepting requests to join"
                        sx={{ m: 1 }}
                    />
                </CardContent>
            </Card>
            <Button onClick={handleUpdate} sx={{ m: 1 }}>Update</Button>
            <Button onClick={() => window.location.href = 'https://old.reddit.com/subreddits/'} sx={{ m: 1 }}>Settings for old site</Button>
        </div>
    );
}

export default CommunitySettings;