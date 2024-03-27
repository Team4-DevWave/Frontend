import "./Profile.css"
import Header from "../components/Header";
import React from "react";
import SideBar from "../layouts/Sidebar";
import RightSidebar from "../components/userProfile/RightSidebar";

function Profile() {
    const user = {
    username: "example_user",
    postKarma: 100,
    commentKarma: 50,
    cakeDay: "January 1, 2020",
    goldReceived: 3,
    socialLinks: [
      { url: "https://example.com", text: "Example Link" },
      { url: "https://another-example.com", text: "Another Example Link" }
    ],
    moderationTools: ["Tool 1", "Tool 2", "Tool 3"]
  };
    return (

    <div className="navbar-padding ">
                            <Header />
            <div className="header"></div>
            <SideBar />
            <div className="sidebar"></div>

      <div className="content">
      </div>
      <div className="rightSidebar">

        <RightSidebar 
          username={user.username}
          postKarma={user.postKarma}
          commentKarma={user.commentKarma}
          cakeDay={user.cakeDay}
          goldReceived={user.goldReceived}
          socialLinks={user.socialLinks}
          moderationTools={user.moderationTools}
        />
      </div>
    </div>
    );
}
export default Profile;
