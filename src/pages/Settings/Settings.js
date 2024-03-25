import "./Settings.css";
import Header from "../../components/Header";
import SettingsNav from "../../components/Settings/SettingsNav";
function Settings() {
  return (
    <div id="settingsID" className="navbar-padding">
      <Header />
      <div className="SettingsHeader">
        <h1 className="SettingsTitle">User settings</h1>
        <SettingsNav />
      </div>
    </div>
  );
}

export default Settings;
