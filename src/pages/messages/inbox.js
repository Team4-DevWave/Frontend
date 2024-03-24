import './messages.css';
import Header from "../../components/Header";
import MessageNav from "../../components/messages/MessageNav";
function inbox() {
    return (
        <div >
            <Header/>
            <div className="header">
                <MessageNav/>
            </div>
        </div>
    );
}

export default inbox;
