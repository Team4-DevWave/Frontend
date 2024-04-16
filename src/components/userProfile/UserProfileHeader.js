/* eslint-disable no-self-assign */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';


function UserProfileHeader() {



  let userName = localStorage.getItem("username");
  userName? userName = userName : userName = "Mahmoud";
  let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };


  return (
    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'left', marginBottom: '20px' }}>
      <Avatar src={process.env.PUBLIC_URL + "/images/erenyega.jpg"} alt={userName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
      <div>
        <Typography variant="h5" gutterBottom>
          {userName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          u/{userName}
        </Typography>
      </div>
    </div>
  );
}



export default UserProfileHeader;
