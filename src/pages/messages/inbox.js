import './messages.css';
import Header from "../../components/Header";
import MessageNav from "../../components/messages/MessageNav";
function inbox() {
    return (
        <div >
            <Header/>
            <div className="header">
                <h1 className='title'>Messages</h1>
                <MessageNav/>
            </div>
        </div>
    );
}

export default inbox;
