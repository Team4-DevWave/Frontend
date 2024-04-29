import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import SocialLinks from '../Settings/Profile/SocialLinks';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import Cookies from 'js-cookie';



const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function RightSidebar ({  postKarma, commentKarma , cakeDay, goldReceived })  {


  const [userInfo, setuserInfo] = useState();
  const [userName, setuserName] = useState();

  cakeDay = getTodayDate();
  let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };

    useEffect(() => {
      axios.get('http://localhost:8000/api/v1/users/me/current', config)
        .then(response => {
          setuserInfo(response.data.data.user);
          console.log('userInfo:', userInfo.username);
          setuserName(userInfo.username)
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <div className="right-sidebar">
      <div className="user-info">
        <h3>{userName}</h3>
        <p>Post Karma: {postKarma}</p>
        <p>Comment Karma: {commentKarma}</p>
        <p>Cake Day: {cakeDay}</p>
        <p>Gold Received: {goldReceived}</p>
      </div>
      <hr />
      <div className="settings">
        <Link to="/settings">
          <button className="edit-profile">Edit Profile</button>
        </Link>
      </div>
      <hr />
      <div className="moderation">
        <h3>Moderation</h3>
        <Link to="https://www.reddit.com/user/Ok_Operation_7782/about/edit/moderation/" >
          <Button
          sx={{
            color: 'var(--color-black)',
            background: 'var(--color-light-gray)',
            fontWeight: 'bold',
            fontSize: 'var(--font-very-small)',
            textTransform: 'none',
            padding: '10px 15px',
            borderRadius: '10rem',
            border: '0',
            ml: 'auto',
          }}
          >
          Mod Settings
          </Button>
        </Link>

     </div>
      <hr />
      <div className="links">
        <h3>Links</h3>
        <SocialLinks/>
      </div>
    </div>
  );
};



export default RightSidebar;
