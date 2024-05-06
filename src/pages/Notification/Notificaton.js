import "./notification.css";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import NotificationNav from "../../components/Notification/NotifactionNav";
import {Meta} from '@storybook/react';
import react from 'react';
function Notification() {
    console.log('notification rendered');
  return (
    <div className="navbar-padding"    >
      <Header />
        <div className="header"></div>
        <Sidebar/>
        <div className="sidebar"></div>

      <div sx={{
          // move to right by 20 px and center
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft:'0px',
            width: '100%',
          margin:'auto'}}
      >
        <h1 className="title">Notification</h1>

        <NotificationNav />
      </div>
    </div>
  );
}

export default Notification;
