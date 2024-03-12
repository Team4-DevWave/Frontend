import React, { useState, useEffect } from 'react';
import { TextField, Box, Avatar, Button } from '@mui/material';

function BlockedUsers() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

    useEffect(() => {
        setIsAddButtonDisabled(userName.trim() === '');
    }, [userName]);

    const handleAddUser = () => {
        if (userName.trim() !== '') {
        const capitalizedFirstChar = userName.trim().charAt(0).toUpperCase();
        const newUser = {
            avatarUrl: 'https://example.com/avatar.jpg', // Replace this with actual avatar URL
            timeAdded: new Date(), // Store the time when the user is added
            name: userName,
            capitalizedFirstChar: capitalizedFirstChar,
        };
        setBlockedUsers([...blockedUsers, newUser]);
        setUserName(''); // Clear the text field after adding the user
        }
    };

    const handleRemoveUser = (index) => {
    const updatedUsers = [...blockedUsers];
    updatedUsers.splice(index, 1);
    setBlockedUsers(updatedUsers);
    };  

    const getTimeElapsedString = (timeAdded) => {
        const now = new Date();
        const timeDiff = now - timeAdded;

        const minutes = Math.floor(timeDiff / (1000 * 60));

        if (minutes < 1) {
        return `just now`;
        }
        
        if (minutes < 60) {
        return `${minutes} minutes ago`;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        if (hours < 24) {
        return `${hours} hours ago`;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        if (days < 7) {
        return `${days} days ago`;
        }

        const weeks = Math.floor(days / 7);
        return `${weeks} weeks ago`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
        // Update the time elapsed string every minute
        setBlockedUsers([...blockedUsers]);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [blockedUsers]);

    return (
        <div className="settingsItem">
        <div>
            <h2 className="titleBody-2">People You’ve Blocked</h2>
            <p className="settingsParagraph">Blocked people can’t send you chat requests or private messages.</p>
            <Box sx={{ width: 700, maxWidth: '100%',
          '@media screen and (max-width: 1000px)': {
            width: '100%'
            }, }}>
            <TextField
                fullWidth
                id="fullWidth"
                label="BLOCK NEW USER"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                InputProps={{
                endAdornment: (
                    <Button onClick={handleAddUser} disabled={isAddButtonDisabled}>Add</Button>
                ),
                }}
            />
            </Box>
            {blockedUsers.map((user, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Avatar src={user.avatarUrl} alt={user.capitalizedFirstChar} />
                <div style={{ marginLeft: '10px', flexGrow: 1 }}>
                <span>{user.name}</span>
                <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{getTimeElapsedString(user.timeAdded)}</span>
                </div>
                <Button onClick={() => handleRemoveUser(index)} >Remove</Button>
            </div>
            ))}
        </div>
        </div>
    );
}

export default BlockedUsers;
