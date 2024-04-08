import "./notification.css";
import Header from "../../components/Header";
import NotificationNav from "../../components/Notification/NotifactionNav";
import {Meta} from '@storybook/react';
function notification() {
  return (
    <div className="navbar-padding">
      <Header />
      <div className="header">
        <h1 className="title">Notification</h1>
        <NotificationNav />
      </div>
    </div>
  );
}

export default notification;
