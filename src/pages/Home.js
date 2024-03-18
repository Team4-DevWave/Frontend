import Header from "../components/Header";
import React from "react";
import SideBar from "../layouts/Sidebar";
import PostContainer from "../components/PostContainer";
function Home() {
  return (
    <div id="home">
      <Header />
      <div className="header"></div>
      <SideBar />
      <div className="sidebar"></div>
      <PostContainer />
      <div className="post-container"></div>
    </div>
  );
}
export default Home;
