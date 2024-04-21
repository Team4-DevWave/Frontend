import Header from "../layouts/Header";
import React, { useEffect } from "react";
import SideBar from "../layouts/Sidebar";
import PostFeed from "../components/UserTabs/Feed";
import SortOptions from "../components/SortOptions";
import LoadingScreen from "../components/LoadingScreen";
import "./Home.css";
import Cookies from "js-cookie";
import GuestHeader from "../layouts/GuestHeader";
import GuestSideBar from "../layouts/GuestSidebar";
function Home() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home-grid">
      <div id="grid-0">
        {Cookies.get("token")?<Header />:<GuestHeader />}
      </div>
      <div id="grid-1">
        {Cookies.get("token")?<SideBar />:<GuestSideBar />}
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
