import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



function Profile() {
  return (
  <div className="settingsBody">
        <h1 className='title titleBody'>Customize profile</h1>
        <div className='settingsData'>
          <div className='titleData'>
          <h2 className="titleDataItem">PROFILE INFORMATION</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Display name (optional)</h2>
            <p className="settingsParagraph">Set a display name. This does not change your username.</p>
          </div>
          </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Gender</h2>
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
            <h2 className="titleBody-2">Display language <span className="beta">(beta)</span></h2>
            <p className="settingsParagraph">Select the language you'd like to experience the Reddit interface in. Note that this won't change the language of user-generated content and that this feature is still in development so translations and UI are still under review.</p>
          </div>

        </div>
        <div className="settingsItem">
          <Select 
            defaultValue="English (US)"
            sx={{
              color: "var(--color-blue)",
              fontWeight: "bold",
              fontSize: "var(--font-medium)",
              mr: 'auto',
            }}
          >
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }}                
              value="English (US)"
            >
              English (US)
            </MenuItem>
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }}                
              value="Arabic"
            >
              Arabic
            </MenuItem>
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }} 
              value="German"
            >
              German
            </MenuItem>
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }} 
              value="French"
            >
              French
            </MenuItem>
            <MenuItem 
              sx={{
                color: "var(--color-gray)",
                fontSize: "var(--font-small)",
              }} 
              value="Italian"
            >
              Italian
            </MenuItem>
          </Select>
        </div>
      <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Content languages</h2>
            <p className="settingsParagraph">Add languages you’d like to see posts, community recommendations, and other content in</p>
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
      <div>
            <h2>Location customization</h2>
            <p className="settingsParagraph">Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data. <span className="link"><a target="_blank" href='https://support.reddithelp.com/hc/en-us/articles/360062429491-Managing-your-Location-Customization-setting' rel="noreferrer">Learn more</a></span></p>
      </div>                        
        </div>

</div>
    );
}

export default Profile;