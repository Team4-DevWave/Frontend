import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./SubredditRules.css";

export default function SubredditRules(props) {
    useEffect(() => {
        console.log(props.isSticky);
    }, [props.isSticky]);
   


    return (
        <div className={props.isSticky? "subreddit-rules sticky": "subreddit-rules"}>
            <h3>Description</h3>
            <div className="subreddit-description">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </div>
            <hr />
            <div className="subreddit-data">
                <ul>
                    <li>
                        <strong>
                            221k
                        </strong>
                        <span>
                            Members
                        </span>
                    </li>
                    <li>
                        <strong>
                            1008
                        </strong>
                        <span>
                            Online
                        </span>
                    </li>
                    <li>
                        <strong>
                            Top 1%
                        </strong>
                        <span>
                            Rank by size
                        </span>
                    </li>

                </ul>
            </div>

            <div className="subreddit-ruleset">
                <h3>Rules</h3>
                <ol type="1">
                    <li>
                     No Racism
                    </li>
                    <li>
                     No Sexism  
                    </li>
                    <li>
                        No Xenophobia
                    </li>
                    <li>
                        No Danganronpa fans
                    </li>
                    <li>
                        No Hate Speech
                    </li>
                    <li>
                        No Harassment
                    </li>
                    <li>
                        No Spam
                    </li>

                </ol>
            </div>
            <div className="subreddit-mods">
                <h3>Moderators</h3>
                <ul>
                    <li>
                        <img className="mod-avatar" src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png" alt="moderator" />
                        <span>u/moderator1</span>
                    </li>
                    <li>
                        <img className="mod-avatar" src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png" alt="moderator" />
                        <span>u/moderator2</span>
                    </li>
                    <li>
                        <img className="mod-avatar" src="https://www.redditstatic.com/avatars/avatar_default_03_24A0ED.png" alt="moderator" />
                        <span>u/moderator3</span>
                    </li>
                </ul>

            </div>
        </div>
    );
    }