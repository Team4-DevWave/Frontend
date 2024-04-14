import "./Settings.css";
import React from "react";
import { useEffect } from "react";
import Header from "../../layouts/Header";
import SettingsNav from "../../components/Settings/SettingsNav";
import LoadingScreen from "../../components/LoadingScreen";
function Settings() {
  
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
    <div id="settingsID" className="navbar-padding">
      <Header />
      <div className="SettingsHeader">
        <h1 className="SettingsTitle">User settings</h1>
        <SettingsNav />
      </div>
    </div>
  );
}

export default Settings;
