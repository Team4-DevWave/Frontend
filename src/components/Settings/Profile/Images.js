import React, { useState } from "react";
import { Box, Button, Avatar } from "@mui/material";

function Images() {
  const [avatarImage, setAvatarImage] = useState(
    "https://i.redd.it/ym0nsl4yrgq71.jpg"
  );
  const [bannerImage, setBannerImage] = useState(
    "https://i.redd.it/ym0nsl4yrgq71.jpg"
  );

  const handleAvatarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
        localStorage.setItem("bannerImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="titleData">
        <h2 className="titleDataItem">IMAGES</h2>
        <div className="horizontalLine horizontalLine-2"></div>
      </div>

      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Avatar and banner image</h2>
          <p className="settingsParagraph">
            Images must be .png or .jpg format
          </p>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 700,
              maxWidth: "100%",
              "@media screen and (max-width: 1000px)": {
                width: "100%",
              },
            }}
          >
            <Button
              sx={{
                color: "var(--color-black)",
                background: "var(--color-light-gray)",
                fontWeight: "bold",
                fontSize: "var(--font-very-small)",
                textTransform: "none",
                padding: "10px 15px",
                borderRadius: "10rem",
                border: "0",
                m: "4px",
                height: "40px",
              }}
              component="label"
            >
              {avatarImage ? "Change Avatar Image" : "Upload Avatar Image"}
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleAvatarImageChange}
              />
            </Button>
            {avatarImage && (
              <Avatar
                alt="Avatar"
                sx={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                  cursor: "pointer", // Add cursor pointer
                }}
                src={avatarImage}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 700,
              maxWidth: "100%",
              "@media screen and (max-width: 1000px)": {
                width: "100%",
              },
            }}
          >
            <Button
              sx={{
                color: "var(--color-black)",
                background: "var(--color-light-gray)",
                fontWeight: "bold",
                fontSize: "var(--font-very-small)",
                textTransform: "none",
                padding: "10px 15px",
                borderRadius: "10rem",
                border: "0",
                m: "4px",
                height: "40px",
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
            {bannerImage && (
              <img src={bannerImage} alt="Banner" className="imageFrame" />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default Images;
