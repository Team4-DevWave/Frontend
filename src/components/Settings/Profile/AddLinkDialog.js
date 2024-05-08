import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import SocialMediaDialog from "./SocialMediaDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const socialMediaButtons = [
  { name: "Reddit", key: "reddit" },
  { name: "GitHub", key: "gitHub" },
  { name: "Linkedin", key: "linkedin" },
  { name: "Twitter", key: "twitter" },
  { name: "Facebook", key: "facebook" },
  { name: "Instagram", key: "instagram" },
  { name: "Youtube", key: "youtube" },
  { name: "Other", key: "other" },
];

const AddLinkDialog = ({ open, onClose }) => {
  const [addedSocialLinks, setAddedSocialLinks] = useState(
    JSON.parse(localStorage.getItem("socialLinks")) || {}
  );
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  const handleOpen = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
  };

  const handleClose = () => {
    setSelectedSocialMedia(null);
  };

  const handleSave = (socialMedia, link) => {
    const updatedLinks = {
      ...addedSocialLinks,
      [socialMedia]: link,
    };
    setAddedSocialLinks(updatedLinks);
    localStorage.setItem("socialLinks", JSON.stringify(updatedLinks));
    handleClose();
  };

  const handleClearAll = () => {
    setAddedSocialLinks({});
    localStorage.removeItem("socialLinks");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Add Social Links</Typography>
        <IconButton
          edge="end"
          onClick={handleClearAll}
          aria-label="clear all"
          sx={{ ml: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {socialMediaButtons.map((button) => (
          <Button
            key={button.key}
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
            }}
            onClick={() => handleOpen(button.key)}
          >
            {`Add ${button.name} Link`}
          </Button>
        ))}
        <SocialMediaDialog
          open={Boolean(selectedSocialMedia)}
          onClose={handleClose}
          onSave={handleSave}
          socialMedia={selectedSocialMedia}
        />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.entries(addedSocialLinks).map(([website, link], index) => (
            <li key={index}>
              <Typography component="span" variant="body1">
                {website.charAt(0).toUpperCase() + website.slice(1)}:{" "}
              </Typography>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "blue", // Change to your preferred link color
                  textDecoration: "underline", // Add underline to mimic links
                  marginLeft: "5px", // Add spacing between website name and link
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLinkDialog;
