import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./SubredditRules.css";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { use } from "marked";
import { useNavigate } from "react-router-dom";
import { List, ListItem } from "@mui/material";

export default function SubredditRules(props) {
  useEffect(() => {
    console.log(props.isSticky);
  }, [props.isSticky]);

  const navigate = useNavigate();
  return (
    <div
      className={props.isSticky ? "subreddit-rules sticky" : "subreddit-rules"}
    >
      <h3>About Community</h3>
      <div className="subreddit-description">{props.status}</div>
      <hr />
      <div className="subreddit-data">
        <ul className="data-list">
          <li>
            <strong>{props.members}</strong>
            <span>Members</span>
          </li>
          <li>
            <strong>{props.members}</strong>
            <span>Online</span>
          </li>
          <li>
            <strong>Top 1%</strong>
            <span>Rank by size</span>
          </li>
        </ul>
      </div>

      <div className="subreddit-ruleset">
        <h3>Rules</h3>
        <ol type="1">
          {props.rules.length === 0 && (
            <li style={{ listStyle: "none" }}>
              No rules have been set for this subreddit
            </li>
          )}
          {props.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>
      <div className="subreddit-mods">
        <h3>Moderators</h3>
        <List>
          {props.moderators.map((mod, index) => (
            <ListItem
              key={index}
              onClick={() => navigate(`/user/${mod.username}`)}
              style={{ cursor: "-moz-grab" }}
            >
              <ListItemAvatar>
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOcB5CtpnCFAaxz3wh59gJGAlw3j_U4dNGbyCkt-izA&s"
                  sx={{ width: 30, height: 30 }}
                />
              </ListItemAvatar>
              <ListItemText>u/{mod.username}</ListItemText>
            </ListItem>
          ))}
        </List>

        <h3>Members</h3>
        <List>
          {props.people.map((member, index) => (
            <ListItem
              key={index}
              onClick={() => navigate(`/user/${member.username}`)}
              style={{ cursor: "cell" }}
            >
              <ListItemAvatar>
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOcB5CtpnCFAaxz3wh59gJGAlw3j_U4dNGbyCkt-izA&s"
                  sx={{ width: 30, height: 30 }}
                />
              </ListItemAvatar>
              <ListItemText>u/{member.username}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

SubredditRules.propTypes = {
  /** Modifies CSS class where the sidebar becomes sticky after scrolling 80px */
  isSticky: PropTypes.bool,
  /** Array of rules for the subreddit */
  rules: PropTypes.array,
  /** Description of the subreddit */
  description: PropTypes.string,
  /** Number of members in the subreddit */
  members: PropTypes.number,
  /** Number of members currently online */
  online: PropTypes.number,
  /** Rank of the subreddit by size */
  rank: PropTypes.string,
  /** Array of moderators */
  moderators: PropTypes.array,
};
