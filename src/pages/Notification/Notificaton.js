import "./notification.css";
import Header from "../../layouts/Header";
import NotificationNav from "../../components/Notification/NotifactionNav";
import {Meta} from '@storybook/react';
import react from 'react';
function Notification({toggleTheme}) {
    console.log('notification rendered');
  return (
    <div className="navbar-padding">
      <Header  toggleTheme={toggleTheme}/>
        <div className="header"></div>

        <div className="sidebar"></div>

      <div className="header">
        <h1 className="title">Notification</h1>

        <NotificationNav />
      </div>
    </div>
  );
}

export default Notification;
