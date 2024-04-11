import "./messages.css";
import Header from "../../layouts/Header";
import MessageNav from "../../components/messages/MessageNav";
function inbox() {
  return (
    <div className="navbar-padding">
      <Header />
      <div className="header">
        <MessageNav />
      </div>
    </div>
  );
}

export default inbox;
