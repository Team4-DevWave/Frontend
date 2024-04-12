import Header from "../layouts/Header";
import React, { useEffect } from "react";
import SideBar from "../layouts/Sidebar";
import PostFeed from "../components/UserTabs/Feed";
import SortOptions from "../components/SortOptions";
import LoadingScreen from "../components/LoadingScreen";
function Home() {
const [loading, setLoading] = React.useState(true);


 useEffect(()=>{
  setTimeout(() => {
    setLoading(false);
  }, 2000);
 },[]);

 if(loading){
   return <LoadingScreen/>
 }

  return (
    <div id="home" className="navbar-padding">
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
