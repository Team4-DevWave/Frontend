import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { SlOptions } from "react-icons/sl";
import './PostDesign.css';

const PostDesign = ({ username, userpic, community, incommunity, Date, title, text, image ,Link}) => {
  const isValidPost = (title && text) || (title && image) ||(title && Link);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="user-profile">
          <img src={userpic} alt="User" className="user-pic" />
          <div className="user-details">
            <p className="username">{username}</p>
            {incommunity && <p className="community">{community}</p>}
            <p className="date">{Date}</p>
          </div>
        </div>
        <div className="options-container">
          
          <Button
                            variant="danger"
                            className="options-button"
                            onClick={toggleOptions}
                        >
                            <SlOptions />
                        </Button>

          {showOptions && (
            <div className="options-list">
              <ul>
                <li>Hide</li>
                <li>Save</li>
                <li>Report</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isValidPost ? (
        <>
          <h2 className="post-title">{title}</h2>
          <div className="post-content">
            {text && <p className="post-text">{text}</p>}
            {image && <img src={image} alt="Post" className="post-image" />}
          </div>
        </>
      ) : (
        <p className="invalid-post">Invalid post data</p>
      )}
    </div>
  );
};

export default PostDesign;
