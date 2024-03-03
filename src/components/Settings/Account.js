
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



function Account() {
  return (
  <div className="settingsBody">
        <h1 className='title titleBody'>Account settings</h1>
        <div className='settingsData'>
          <div className='titleData'>
          <h2 className="titleDataItem">ACCOUNT PREFERENCES</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
            <h2>Email address</h2>
            <p className="settingsParagraph">example@gmail.com</p>
          </div>
          <Button
            
            sx={{
              color: "var(--color-blue)",
              fontWeight: "bold",
              fontSize: "var(--font-medium-2)",
              textTransform:'none',
              padding: '.5rem 2rem',
              borderRadius: '10rem',
              border: '1px solid var(--color-blue)',
              ml: 'auto',
              '&:hover': {},}}>Change</Button>
          </div>
        <div className="settingsItem">
          <div>
            <h2>Gender</h2>
            <p className="settingsParagraph">This information may be used to improve your recommendations and ads.</p>
          </div>
          <Select 
            defaultValue="man"
            sx={{
              color: "var(--color-blue)",
              fontWeight: "bold",
              fontSize: "var(--font-medium)",
              ml: 'auto',
            }}
          >
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }}                
              value="man"
            >
              Man
            </MenuItem>
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }} 
              value="woman"
            >
              Woman
            </MenuItem>
          </Select>
          </div>
        <div className="settingsItem">
          <div>
            <h2>Display language (beta)</h2>
            <p className="settingsParagraph">Select the language you'd like to experience the Reddit interface in. Note that this won't change the language of user-generated content and that this feature is still in development so translations and UI are still under review.</p>
          </div>

          </div>
          
        </div>

</div>
    );
}

export default Account;