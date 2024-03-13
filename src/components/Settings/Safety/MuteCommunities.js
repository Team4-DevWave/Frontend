import React, { useState, useEffect } from 'react';
import { TextField, Box, Avatar, Button } from '@mui/material';

function MuteCommunities() {
  const [mutedCommunities, setMutedCommunities] = useState([]);
  const [communityName, setCommunityName] = useState('');
  const [isAddCommunityButtonDisabled, setIsAddCommunityButtonDisabled] = useState(true);

  useEffect(() => {
    setIsAddCommunityButtonDisabled(communityName.trim() === '');
  }, [communityName]);

  const handleAddCommunity = () => {
    if (communityName.trim() !== '') {
      const capitalizedFirstChar = communityName.trim().charAt(0).toUpperCase();
      const newCommunity = {
        avatarUrl: 'https://example.com/avatar.jpg',
        timeAdded: new Date(),
        name: communityName,
        capitalizedFirstChar: capitalizedFirstChar,
      };
      setMutedCommunities([...mutedCommunities, newCommunity]);
      setCommunityName('');
    }
  };

  const handleRemoveCommunity = (index) => {
    const updatedCommunities = [...mutedCommunities];
    updatedCommunities.splice(index, 1);
    setMutedCommunities(updatedCommunities);
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

  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Communities You've Muted</h2>
        <p className="settingsParagraph">Posts from muted communities won't show up in your feeds or recommendations.</p>
        <Box sx={{ width: 700, maxWidth: '100%',
          '@media screen and (max-width: 1000px)': {
            width: '100%'
            },       }}>
          <TextField
            fullWidth
            id="fullWidth"
            label="MUTE NEW COMMUNITY"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button onClick={handleAddCommunity} disabled={isAddCommunityButtonDisabled}>Add</Button>
              ),
            }}
          />
        </Box>
        {mutedCommunities.map((community, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Avatar src={community.avatarUrl} alt={community.capitalizedFirstChar} />
            <div style={{ marginLeft: '10px', flexGrow: 1 }}>
              <span>{community.name}</span>
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>{getTimeElapsedString(community.timeAdded)}</span>
            </div>
            <Button onClick={() => handleRemoveCommunity(index)} >Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MuteCommunities;
