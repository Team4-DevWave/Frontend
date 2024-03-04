
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
            <h2>Display language <span className="beta">(beta)</span></h2>
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
            <h2>Content languages</h2>
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
      <div>
              <Select 
                defaultValue="Use approximate location (based on IP)"
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
                  value="Use approximate location (based on IP)"
                >Use approximate location (based on IP)
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }}                
                  value="No location specified"
                >
                  No location specified
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Afghanistan"
                >
                  Afghanistan
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Afghanistan"
                >
                  Afghanistan
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Albania"
                >
                  Albania
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Algeria"
                >
                  Algeria
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="American Samoa"
                >
                  American Samoa
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Angola"
                >
                  Angola
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Egypt"
                >
                  Egypt
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Palestine"
                >
                  Palestine
                </MenuItem>
                <MenuItem 
                  sx={{
                    color: "var(--color-gray)",
                    fontSize: "var(--font-small)",
                  }} 
                  value="Albania"
                >
                  Albania
                </MenuItem>
              </Select>
      </div>
          <div className='titleData'>
          <h2 className="titleDataItem">DELETE ACCOUNT</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
                  <div className="settingsItem">
          <Button
          color="error"
            sx={{
              color: "var(--color-light-red)",
              fontWeight: "bold",
              fontSize: "var(--font-small)",
              borderRadius: '10rem',
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',

              '&:hover': {},}}><img  src="./images/delete.png" width="20px" alt="Delete"/> <span> DELETE ACCOUNT</span></Button>
        </div>
                        
        </div>

</div>
    );
}

export default Account;