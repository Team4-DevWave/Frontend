import Header from "../layouts/Header";
import React, { useEffect,useState } from "react";
import SideBar from "../layouts/Sidebar";
import PostFeed from "../components/UserTabs/Feed";
import SortOptions from "../components/SortOptions";
import LoadingScreen from "../components/LoadingScreen";
import "./Home.css";
import Cookies from "js-cookie";
import GuestHeader from "../layouts/GuestHeader";
import GuestSideBar from "../layouts/GuestSidebar";

import Overlay from "../components/overlay/Overlay.js";

function Home({toggleTheme}) {
  const [loading, setLoading] = React.useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    document.title = "Home";
  
  }, []);



  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <div className="home-grid">
      <button onClick={toggleOverlay}>Toggle Chat </button>
      {showOverlay && <Overlay />}


      <div id="grid-0">

        {Cookies.get("token") ? <Header toggleTheme = {toggleTheme}/> : <GuestHeader />}
      </div>
      <div id="grid-1">
        {Cookies.get("token") ? <SideBar /> : <GuestSideBar />}
      </div>
      <div id="grid-2">
        <SortOptions />
        <div className="post-feed">
          <PostFeed />
        </div>
      </div>
    </div>
  );
}
export default Home;
