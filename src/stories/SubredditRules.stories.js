import React from "react";
import SubredditRules from "../components/SubredditRules";
import { Meta } from "@storybook/addon-docs/blocks";
<Meta title="Components/SubredditRules" component={SubredditRules} />
export default {
    title: "Subreddit/Subreddit Rules",
    component: SubredditRules,
    tags: ['autodocs'],
    argTypes: {
        isSticky: { control: { disable: true } },
        rules: { control: { disable: true } },
        description: { control: { disable: true } },
        members: { control: { disable: true } },
        online: { control: { disable: true } },
        rank: { control: { disable: true } },
        moderators: { control: { disable: true }}
    },
}
/** Displays the rules of the subreddit */
export const SubredditRulesComponent = (args) => (
    <div style={{height :"100vh", width:"300px"}}>
        <SubredditRules />
    </div>
);