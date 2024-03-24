import Header from "../components/Header";
import React from "react";
import SideBar from "../layouts/Sidebar";
import PostContainer from "../components/PostContainer";
import PostFeed from "../components/UserTabs/Feed";
import SortOptions from "../components/SortOptions";
function Home() {
  return (
    <div id="home">
      <Header />
      <div className="header"></div>
      <SideBar />
      <div className="sidebar"></div>
      <SortOptions />
      <div className="sort-options"></div>
      <PostFeed />
      <div className="post-feed"></div>
    </div>
  );
}
export default Home;
