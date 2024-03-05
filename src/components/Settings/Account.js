
import  ButtonEdited  from '../MUIEdited/Button';
import  SelectEdited  from '../MUIEdited/SelectEdited';
import { Button } from '@mui/material';

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
            <h2 className="titleBody-2">Email address</h2>
            <p className="settingsParagraph">example@gmail.com</p>
          </div>
          <ButtonEdited color="var(--color-blue)" value="Change" />

        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Gender</h2>
            <p className="settingsParagraph">This information may be used to improve your recommendations and ads.</p>
          </div>
          <SelectEdited defaultValue="Man" values={['Man', 'Woman']} mr='none' ml='auto' />

        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Display language <span className="beta">(beta)</span></h2>
            <p className="settingsParagraph">Select the language you'd like to experience the Reddit interface in. Note that this won't change the language of user-generated content and that this feature is still in development so translations and UI are still under review.</p>
          </div>

        </div>
        <div className="settingsItem">
        <SelectEdited defaultValue="English (US)" values={['English (US)','Arabic','German','French','Italian','Indian']}  mr='auto' ml='none' />

        </div>
      <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Content languages</h2>
            <p className="settingsParagraph">Add languages you’d like to see posts, community recommendations, and other content in</p>
          </div>
          <ButtonEdited color="var(--color-blue)" value="Change" />

      </div>
      <div>
            <h2 className="titleBody-2">Location customization</h2>
            <p className="settingsParagraph">Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data. <span className="link"><a target="_blank" href='https://support.reddithelp.com/hc/en-us/articles/360062429491-Managing-your-Location-Customization-setting' rel="noreferrer">Learn more</a></span></p>
      </div>
      <div>
       <SelectEdited defaultValue="Use approximate location (based on IP)" values={['Use approximate location (based on IP)','No location specified','Afghanistan','Afghanistan','Albania','Algeria', 'American Samoa', 'Palestine', 'Egypt', 'Angola', 'Albania']}  mr='auto' ml='none' />


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
              fontSize: "var(--font-very-small)",
              borderRadius: '10rem',
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',}}><img  src="./images/delete.png" width="20px" alt="Delete"/> <span> DELETE ACCOUNT</span></Button>
        </div>
        </div>

</div>
    );
}

export default Account;