import React from "react";
import Subreddit from "../pages/Subreddit";
import { BrowserRouter as Router } from "react-router-dom";
import "../pages/Subreddit.css";
import "../components/PostContainer.css";
import "../components/SubredditRules.css";

export default {
  title: "Subreddit/Subreddit page",
  component: Subreddit,
  tags: ["autodocs"],
  argTypes: {
    name: { control: { disable: false} },
    posts: { control: { disable: true } },
    members: { control: { disable: true } },
    online: { control: { disable: true } },
    rank: { control: { disable: true } },
    moderators: { control: { disable: true } },
    description: { control: { disable: true } },
    rules: { control: { disable: true } },
    joinStatus: { control: { disable: true } },
    notificationFrequency: { control: { disable: true } },
  },
};

/** Subreddit page displays posts, members, and rules */
export const Subreddit1 = (args) => (
  <>
    <Router>
      <Subreddit name={args.name} />
    </Router>
  </>
);
