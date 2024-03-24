import React, { useState } from 'react';
import {  Switch } from '@mui/material';

function Switches() {
  const [alcoholAllowed, setAlcoholAllowed] = useState(true);
  const [datingAllowed, setDatingAllowed] = useState(true);
  const [gamblingAllowed, setGamblingAllowed] = useState(true);
  const [pregnancyAllowed, setPregnancyAllowed] = useState(true);
  const [weightLossAllowed, setWeightLossAllowed] = useState(true);

  const handleToggle = (category) => {
    switch (category) {
      case 'alcohol':
        setAlcoholAllowed(!alcoholAllowed);
        break;
      case 'dating':
        setDatingAllowed(!datingAllowed);
        break;
      case 'gambling':
        setGamblingAllowed(!gamblingAllowed);
        break;
      case 'pregnancy':
        setPregnancyAllowed(!pregnancyAllowed);
        break;
      case 'weightLoss':
        setWeightLossAllowed(!weightLossAllowed);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='titleData'>
        <h2 className="titleDataItem">SENSITIVE ADVERTISING CATEGORIES</h2>
        <div class="horizontalLine horizontalLine-2"></div>
      </div>
      <p className='settingsParagraph'>You can limit ads about these topics. We’ll do our best not to show them to you when you are signed into your Reddit account.</p>

      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Alcohol</h2>
          <p className='settingsParagraph'>{alcoholAllowed ? 'Allowed' : 'Limited by you'}</p>
        </div>
        <Switch defaultChecked={alcoholAllowed} onChange={() => handleToggle('alcohol')} sx={{ ml: 'auto' }} />
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Dating</h2>
          <p className='settingsParagraph'>{datingAllowed ? 'Allowed' : 'Limited by you'}</p>
        </div>
        <Switch defaultChecked={datingAllowed} onChange={() => handleToggle('dating')} sx={{ ml: 'auto' }} />
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Gambling</h2>
          <p className='settingsParagraph'>{gamblingAllowed ? 'Allowed' : 'Limited by you'}</p>
        </div>
        <Switch defaultChecked={gamblingAllowed} onChange={() => handleToggle('gambling')} sx={{ ml: 'auto' }} />
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Pregnancy and parenting</h2>
          <p className='settingsParagraph'>{pregnancyAllowed ? 'Allowed' : 'Limited by you'}</p>
        </div>
        <Switch defaultChecked={pregnancyAllowed} onChange={() => handleToggle('pregnancy')} sx={{ ml: 'auto' }} />
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Weight loss</h2>
          <p className='settingsParagraph'>{weightLossAllowed ? 'Allowed' : 'Limited by you'}</p>
        </div>
        <Switch defaultChecked={weightLossAllowed} onChange={() => handleToggle('weightLoss')} sx={{ ml: 'auto' }} />
      </div>
    </div>
  );
}

export default Switches;
