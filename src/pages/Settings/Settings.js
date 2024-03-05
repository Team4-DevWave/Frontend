import './Settings.css';
import Header from '../../components/Header';
import SettingsNav from '../../components/Settings/SettingsNav';
function Settings() {
  return (
    <div id='settingsID' >
    <Header/>
    <div className="header">
    <h1 className='title'>User settings</h1>
    <SettingsNav/>
  </div>
</div>  
    );
}

export default Settings;
