import React, { useState, useEffect, useRef, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import Cookies from 'js-cookie';





function RightSidebar ({  postKarma = 0, commentKarma = 0, cakeDay, goldReceived = 0, socialLinks = [], moderationTools = [] })  {


  const [userInfo, setuserInfo] = useState();
  const [userName, setuserName] = useState();

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
        <p>Cake Day: {cakeDay} April 14, 2024</p>
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
        <ul>
          {moderationTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="links">
        <h3>Links</h3>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ))}
      </div>
      <hr />
      <div className="community">
        <h3>Join the Community</h3>
        <p>Subscribe to get the latest updates and news</p>
        <button className="subscribe-button">Subscribe</button>
      </div>
    </div>
  );
};



export default RightSidebar;
