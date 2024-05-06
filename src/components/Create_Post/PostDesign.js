import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { SlOptions } from "react-icons/sl";
import "./PostDesign.css";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { marked } from "marked";
import { useLocation, Link } from "react-router-dom";
import { Avatar } from "@mui/material";

// URL for the blurred image
const blurredImageUrl =
  "https://via.placeholder.com/150/000000/FFFFFF?text=Spoiler";

const PostDesign = ({
  id,
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
  mentioned,
  Poll,
}) => {
  const [spoilerClicked, setSpoilerClicked] = useState(false);
  const [votedOption, setVotedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [poll, setPoll] = useState(Poll); // Initialize with the initial value of Poll
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const isValidPost =
    (title && text) ||
    (title && image) ||
    (title && Link) ||
    (title && video) ||
    (title && Poll);

  const handleSpoilerClick = () => {
    setSpoilerClicked(true);
  };

  const handleVote = () => {
    if (selectedOption) {
      const updatedPoll = { ...poll };
      updatedPoll[selectedOption] = updatedPoll[selectedOption] + 1;
      setVotedOption(selectedOption);
      setPoll(updatedPoll);
    }
  };

  function colorUsernames(text, mentioned) {
    // This regular expression matches u/username
    const regex = /(u\/\w+)/g;
    console.log("mention", mentioned);
    // Replace all instances of u/username with an anchor tag with the "username" class
    return text.replace(regex, (match) => {
      // Remove the 'u/' from the start of the match to get the username
      const username = match.slice(2);

      // Check if the username is in the mentioned list
      if (mentioned && mentioned.includes(username)) {
        // If it is, replace it with an anchor tag

        return `<a href="/user/${username}" class="username-mention">${match}</a>`;
      } else {
        // If it's not, return the match as is
        return match;
      }
    });
  }

  return (
    <div>
      <div className="post-header">
        <div className="user-profile">
          <Avatar
            src={
              userpic ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOcB5CtpnCFAaxz3wh59gJGAlw3j_U4dNGbyCkt-izA&s"
            }
            sx={{
              width: 30,
              height: 30,
              marginRight: "10px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
          <div className="user-details">
            <p className="username">{username}</p>
            {incommunity && (
              <a
                className="community"
                href={`/r/${community.replace(/ /g, "-")}`}
                onClick={(event) => {
                  if (
                    event.target.tagName === "BUTTON" ||
                    window.location.pathname.includes(
                      `/r/${community.replace(/ /g, "-")}`
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
                style={{
                  margin: "0",
                  padding: "0",
                  position: "relative",
                  top: "5px",
                  textDecoration: "none",
                }}
              >
                {community}
              </a>
            )}
            <p className="date">{Date}</p>
          </div>
        </div>
      </div>
      {isValidPost ? (
        <>
          {spoiler && (
            <>
              <BsExclamationDiamondFill />
              <strong> SPOILER </strong>
            </>
          )}
          {title.trim() !== "" ? (
            <a
              className="post-link"
              href={`/comments/${id}/${title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")}`}
              onClick={(event) => {
                if (
                  event.target.tagName === "BUTTON" ||
                  window.location.pathname.includes("/comments/")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <h2 className="post-title">{title}</h2>
            </a>
          ) : null}
          {spoiler && !spoilerClicked ? ( // Check if spoiler is true and not clicked
            <div className="post-content" onClick={handleSpoilerClick}>
              <img src={blurredImageUrl} alt="Spoiler" className="blur-image" />
            </div>
          ) : (
            <div className="post-content">
              {Link && (
                <a href={Link} className="post-link" style={{ color: "blue" }}>
                  {Link}
                </a>
              )}
              {text ? (
                Object.keys(mentioned).length > 0 ? (
                  <p
                    className="post-text"
                    dangerouslySetInnerHTML={{
                      __html: marked(colorUsernames(text, mentioned)),
                    }}
                  />
                ) : (
                  <a
                    className="post-link"
                    href={`/comments/${id}/${title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")}`}
                    onClick={(event) => {
                      if (
                        event.target.tagName === "BUTTON" ||
                        window.location.pathname.includes("/comments/")
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <p
                      className="post-text"
                      dangerouslySetInnerHTML={{
                        __html: marked(colorUsernames(text, mentioned)),
                      }}
                    ></p>
                  </a>
                )
              ) : null}
              {image && <img src={image} alt="Post" className="post-image" />}

              {poll && (
                <div className="poll-section">
                  {Object.entries(poll).map(([option, rate], index) => (
                    <div key={option}>
                      {votedOption === option ? (
                        <span>&#10004;</span>
                      ) : (
                        <input
                          type="radio"
                          name="poll-option"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                          disabled={votedOption !== null}
                        />
                      )}
                      <label>{option}</label>
                      {votedOption && (
                        <span style={{ fontWeight: "bold" }}> ({rate})</span>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="primary"
                    onClick={handleVote}
                    disabled={votedOption !== null || selectedOption === null}
                  >
                    {votedOption ? "Vote Recorded" : "Vote"}
                  </Button>
                </div>
              )}

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
