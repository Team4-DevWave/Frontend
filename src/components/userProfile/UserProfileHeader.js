import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function UserProfileHeader({ username }) {

  return (
    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'left', marginBottom: '20px' }}>
      <Avatar src={process.env.PUBLIC_URL + "/images/erenyega.jpg"} alt={username} sx={{ width: 100, height: 100, marginRight: '20px' }} />
      <div>
        <Typography variant="h5" gutterBottom>
          {username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          u/{username}
        </Typography>
      </div>
    </div>
  );
}

UserProfileHeader.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserProfileHeader;
