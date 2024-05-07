import "./messages.css";
import Header from "../../layouts/Header";
import MessageNav from "../../components/messages/MessageNav";
function inbox({toggleTheme}) {
  return (
    <div className="navbar-padding">
      <Header toggleTheme={toggleTheme} />
      <div className="header">
        <MessageNav />
      </div>
    </div>
  );
}

export default inbox;
