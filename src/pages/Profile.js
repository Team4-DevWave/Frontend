import "./Profile.css";
import Header from "../layouts/Header";
import React, { useEffect, useState } from "react";
import SideBar from "../layouts/Sidebar";
import RightSidebar from "../components/userProfile/RightSidebar";
import ProfileNav from "../components/userProfile/ProfileNav";
import UserProfileHeader from "../components/userProfile/UserProfileHeader";
import axios from "axios";
function Profile() {
  const [userData, setUserData] = useState({
    username: "Mahmoud",
    postKarma: 1,
    commentKarma: 2,
    cakeDay: "",
    goldReceived: 20,
    socialLinks: [],
    moderationTools: [],
    overviewData: null,
    comments: [],
    upvotedComments: [],
    downvotedComments: [],
    hiddenPosts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(
          "https://www.threadit.tech/api/v1/users/me/current"
        );
        const user = userResponse.data.data;

        // Fetch user overview
        const overviewResponse = await axios.get(
          `https://www.threadit.tech/api/v1/users/${user.username}/overview?page=1`
        );
        const overviewData = overviewResponse.data.data;

        // Fetch user comments
        const commentsResponse = await axios.get(
          `https://www.threadit.tech/api/v1/users/${user.username}/comments`
        );
        const comments = commentsResponse.data.data.comments;

        // Fetch user upvotes
        const upvotesResponse = await axios.get(
          "https://www.threadit.tech/api/v1/users/me/upvoted?page=1"
        );
        const upvotedComments = upvotesResponse.data.data.comments;

        // Fetch user downvotes
        const downvotesResponse = await axios.get(
          "https://www.threadit.tech/api/v1/users/me/downvoted?page=1"
        );
        const downvotedComments = downvotesResponse.data.data.comments;

        // Fetch user hidden posts
        const hiddenResponse = await axios.get(
          "https://www.threadit.tech/api/v1/users/me/hidden?page=1"
        );
        const hiddenPosts = hiddenResponse.data.data.posts;

        const today = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };

        // Update state with fetched data
        setUserData({
          username: user.username,
          postKarma: user.postKarma,
          commentKarma: user.commentKarma,
          cakeDay: today.toLocaleDateString(undefined, options),
          goldReceived: user.goldReceived,
          socialLinks: user.socialLinks,
          moderationTools: user.moderationTools,
          overviewData,
          comments,
          upvotedComments,
          downvotedComments,
          hiddenPosts,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="navbar-padding">
      <Header />
      <div className="sidebar" id="profgrid-1">
        <SideBar />
      </div>

      <div class="profileCSS">
        <div class="userProfileHeader">
          <UserProfileHeader />
        </div>
      </div>
      <div class="profileNav">
        <ProfileNav
          overviewData={userData.overviewData}
          postsData={userData.postsData}
          commentsData={userData.commentsData}
          savedData={userData.savedData}
          hiddenData={userData.hiddenData}
          upvotedData={userData.upvotedData}
          downvotedData={userData.downvotedData}
        />
      </div>
      <div className="rightSidebar">
        <RightSidebar
          username={userData.username}
          postKarma={userData.postKarma}
          commentKarma={userData.commentKarma}
          cakeDay={userData.cakeDay}
          goldReceived={userData.goldReceived}
          socialLinks={userData.socialLinks}
          moderationTools={userData.moderationTools}
        />
      </div>
    </div>
  );
}

export default Profile;
