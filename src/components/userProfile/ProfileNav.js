import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import UserPost from "../UserTabs/UserPost";
import UserSavedPost from "../UserTabs/UserSavedPost";
import UserHidden from "../UserTabs/UserHiddenPost";
function ProfileNav({
  overviewData,
  postsData,
  commentsData,
  savedData,
  hiddenData,
  upvotedData,
  downvotedData,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState(null); // State to store tab-specific data
  const token = "your_token_here"; // Replace 'your_token_here' with your actual token
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchData = async (tabIndex) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/me/${getTabName(tabIndex)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTabData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTabData(null); // Clear tab data in case of error
    }
  };

  const getTabName = (index) => {
    switch (index) {
      case 0:
        return "overview";
      case 1:
        return "posts";
      case 2:
        return "comments";
      case 3:
        return "saved";
      case 4:
        return "hidden";
      case 5:
        return "upvoted";
      case 6:
        return "downvoted";
      default:
        return "";
    }
  };

  return (
    <div>
      <Tabs
        className="profileNavTabs"
        value={activeTab}
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        indicatorColor="primary"
        textColor="primary"
        left
      >
        <Tab
          label="Overview"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Posts"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Comments"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Saved"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Hidden"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Upvoted"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Tab
          label="Downvoted"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-small)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
      </Tabs>

      <div>
        {tabData ? (
          <Typography component="div" sx={{ p: 3 }}>
<<<<<<< Updated upstream
            {activeTab === 0 && JSON.stringify(overviewData)}
            {activeTab === 1 && JSON.stringify(postsData)}
            {activeTab === 2 && JSON.stringify(commentsData)}
            {activeTab === 3 && JSON.stringify(savedData)}
            {activeTab === 4 && JSON.stringify(hiddenData)}
            {activeTab === 5 && JSON.stringify(upvotedData)}
=======
            {activeTab === 0 && <OverView  />}
            {activeTab === 1 && <UserPost  />}
            {activeTab === 2 && <UserComments />}
            {activeTab === 3 && <UserSavedPost />}
            {activeTab === 4 && <UserHidden/>}
            {activeTab === 5 && <Upvoted />}
>>>>>>> Stashed changes
            {activeTab === 6 && JSON.stringify(downvotedData)}
          </Typography>
        ) : (
          <Typography component="div" sx={{ p: 3 }}>
            Loading...
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ProfileNav;
