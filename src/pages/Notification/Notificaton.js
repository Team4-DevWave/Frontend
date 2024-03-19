import './notification.css';
import Header from "../../components/Header";
import NotificationNav from "../../components/Notification/NotifactionNav";
function notification() {
    return (
        <div >
            <Header/>
            <div className="header">
                <h1 className='title'>Notification</h1>
                <NotificationNav/>
            </div>
        </div>
    );
}

export default notification;
