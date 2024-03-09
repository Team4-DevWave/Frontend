import Header from "../components/Header";
import React from "react";
import SideBar from "../layouts/Sidebar";
function Home() {
  return (
    <div id="home">
      <Header />
      <div className="header"></div>
      <SideBar />
      <div className="sidebar"></div>
    </div>
  );
}
export default Home;
