import React, { useState, useEffect, useRef, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import Cookies from 'js-cookie';


function UserProfileHeader() {




  const userName = localStorage.getItem("username");
  let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };


  return (
    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'left', marginBottom: '20px' }}>
      <Avatar src={process.env.PUBLIC_URL + "/images/erenyega.jpg"} alt={userName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
      <div>
        <Typography variant="h5" gutterBottom>
          {username1}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          u/{username1}
        </Typography>
      </div>
    </div>
  );
}



export default UserProfileHeader;
