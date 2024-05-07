import "./notification.css";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import NotificationNav from "../../components/Notification/NotifactionNav";
import {Meta} from '@storybook/react';
import react from 'react';
import {useTheme} from '@mui/material/styles';
import {useMediaQuery} from '@mui/material';

function Notification({toggleTheme}) {
    console.log('notification rendered');
  return (
    <div className="navbar-padding">
      <Header  toggleTheme={toggleTheme}/>
        <div className="header"></div>

        <div className="sidebar"></div>

function Notification() {
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width: 1143px)');

    console.log('notification rendered');
    return (
        <div className="navbar-padding">
            <Header />
            <div className="header"></div>
            {isDesktop && <Sidebar />}
            <div className="sidebar"></div>

            <div sx={{
                alignItems: 'center',
                display: '',
                justifyContent: 'center',
                paddingLeft: isDesktop ? '200px' : '0px',
                width: '100%',
                margin: 'auto',
            }}
            >
                <h1 className="title">Notification</h1>
                <NotificationNav />
            </div>
        </div>
    );
}

export default Notification;