import "./notification.css";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import NotificationNav from "../../components/Notification/NotifactionNav";
import { Meta } from '@storybook/react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

function Notification({ toggleTheme }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width: 1143px)');
    const isMobile = useMediaQuery('(max-width: 1142px)');

    console.log('notification rendered');
    return (
        <div className="navbar-padding">
            <Header toggleTheme={toggleTheme} />
            <div className="header"></div>
            <div className="sidebar">
                {isDesktop && <Sidebar />}
            </div>
            <div sx={{
                alignItems: 'center',
                display: '',
                justifyContent: 'center',
                paddingLeft: isDesktop ? '200px' : '0px',
                width: '100%',
                margin: isMobile ? '0' : '0 300px 0 0px',
            }}
            >
                <h1 className="title">Notification</h1>
                <NotificationNav />
            </div>
        </div>
    );
}

export default Notification;