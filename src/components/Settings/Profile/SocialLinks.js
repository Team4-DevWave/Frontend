// SocialLinks.js
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddLinkDialog from "./AddLinkDialog";
import PlusIcon from "./PlusIcon.js";

function SocialLinks() {
  const [open, setOpen] = useState(false);

  const [addedSocialLinks, setAddedSocialLinks] = useState(
    JSON.parse(localStorage.getItem("socialLinks")) || {}
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Social links (5 max)</h2>
        <p className="settingsParagraph">
          People who visit your profile will see your social links.
        </p>
        {/* Display saved links */}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.keys(addedSocialLinks).map((socialMedia, index) => (
            <li key={index}>
              <a
                href={addedSocialLinks[socialMedia]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#005ba1",
                  textDecoration: "underline",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              >
                {socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)}
              </a>
            </li>
          ))}
        </ul>

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
            ml: "auto",
          }}
          onClick={handleOpen}
        >
          <PlusIcon /> Add Social Links
        </Button>
        <AddLinkDialog open={open} onClose={handleClose} />
      </div>
    </div>
  );
}

export default SocialLinks;
