import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import "./PostDesign.css";
import { BsExclamationDiamondFill } from "react-icons/bs";

// URL for the blurred image
const blurredImageUrl = "https://via.placeholder.com/150/000000/FFFFFF?text=Spoiler";

const PostDesign = ({
  username,
  userpic,
  community,
  incommunity,
  Date,
  title,
  text,
  image,
  Link,
  video,
  spoiler,
}) => {
  const [spoilerClicked, setSpoilerClicked] = useState(false);

  const isValidPost = (title && text) || (title && image) || (title && Link) || (title && video);

  const handleSpoilerClick = () => {
    setSpoilerClicked(true);
  };

  return (
    <div>
      <div className="post-header">
        <div className="user-profile">
          <img src={userpic} alt="User" className="user-pic" />
          <div className="user-details">
            <p className="username">{username}</p>
            {incommunity && <p className="community">{community}</p>}
            <p className="date">{Date}</p>
          </div>
        </div>
      </div>
      {isValidPost ? (
        <>
{spoiler && (
  <>
    <BsExclamationDiamondFill />
    <strong > SPOILER </strong>
  </>
)}
          <h2 className="post-title">{title}</h2>
          {spoiler && !spoilerClicked ? ( // Check if spoiler is true and not clicked
            <div className="post-content" onClick={handleSpoilerClick}>
              <img src={blurredImageUrl} alt="Spoiler" className="blur-image" />
            </div>
          ) : (
            <div className="post-content">
              {text && <p className="post-text">{text}</p>}
              {Link && <p className="post-text">{Link}</p>}
              {image && <img src={image} alt="Post" className="post-image" />}
              {video && (
                <video controls className="post-video">
                  <source src={video} type="video/mp4" />
                </video>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="invalid-post">Invalid post data</p>
      )}
    </div>
  );
};

export default PostDesign;
