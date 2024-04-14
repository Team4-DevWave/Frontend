import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

function Images() {
  const [avatarImage, setAvatarImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleAvatarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));

    }
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className='titleData'>
        <h2 className="titleDataItem">IMAGES</h2>
        <div className="horizontalLine horizontalLine-2"></div>
      </div>

      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Avatar and banner image</h2>
          <p className="settingsParagraph">Images must be .png or .jpg format</p>
          <Box sx={{ width: 700, maxWidth: '100%',
          '@media screen and (max-width: 1000px)': {
          width: '100%'
        },         }}>
            <Button
            sx={{
              color: 'var(--color-black)',
              background: 'var(--color-light-gray)',
              fontWeight: 'bold',
              fontSize: 'var(--font-very-small)',
              textTransform: 'none',
              padding: '10px 15px',
              borderRadius: '10rem',
              border: '0',
              m: '4px',
              
            }}              component="label">
              {avatarImage ? "Change Avatar Image" : "Upload Avatar Image"}
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleAvatarImageChange}
              />
            </Button>
            {avatarImage && <img src={avatarImage} alt="Avatar" className="imageFrame" />}
            </Box>
          <Box sx={{ width: 700, maxWidth: '100%',
          '@media screen and (max-width: 1000px)': {
          width: '100%'
        },         }}>

            <Button
            sx={{
              color: 'var(--color-black)',
              background: 'var(--color-light-gray)',
              fontWeight: 'bold',
              fontSize: 'var(--font-very-small)',
              textTransform: 'none',
              padding: '10px 15px',
              borderRadius: '10rem',
              border: '0',
              m: '4px',
            }}
            component="label"
            >
              {bannerImage ? "Change Banner Image" : "Upload Banner Image"}
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleBannerImageChange}
              />
            </Button>
            {bannerImage && <img src={bannerImage} alt="Banner" className="imageFrame" />}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Images;
