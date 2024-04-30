import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import GuestHeader from "../layouts/GuestHeader";
import SideBar from "../layouts/Sidebar";
import GuestSideBar from "../layouts/GuestSidebar";
import LoadingScreen from "../components/LoadingScreen";
import { Pagination, Tab, Tabs, Typography } from "@mui/material";
import FoundUsers from "../layouts/SearchResultsTabs/FoundUsers";
import FoundCommunities from "../layouts/SearchResultsTabs/FoundCommunitites";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FoundPosts from "../layouts/SearchResultsTabs/FoundPosts";
import FoundComments from "../layouts/SearchResultsTabs/FoundComments";
import FoundMedia from "../layouts/SearchResultsTabs/FoundMedia";


export default function SearchPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/homepage/search?q=${query}&sort=Top&page=${page}`
      )
      .then((res) => {
        setResults(res.data.data);
        //console.log("comments",results.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);


  useEffect(() => {
    console.log("results", results.comments);
  }, [results]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home-grid">
      <div id="grid-0">
        {Cookies.get("token") ? <Header /> : <GuestHeader />}
      </div>
      <div id="grid-1">
        {Cookies.get("token") ? <SideBar /> : <GuestSideBar />}
      </div>
      <div id="grid-2" style={{borderRadius:"50px",backgroundColor:"#fcfcfc"}}>
        <Typography variant="h5" gutterBottom>
          Search Results for "{query}"
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Users" />
          <Tab label="Communities" />
          <Tab label="Media" />
          <Tab label="Comments" />
          <Tab label="Posts" />
        </Tabs>

        <hr />

        {value === 0 ? (
          <FoundUsers userData={results.users} />
        ) : value === 1 ? (
          <FoundCommunities communityData={results.subreddits} />
        ) : value === 2 ? (
          <FoundMedia media={results.media} />
        ) : value === 3 ? (
          <FoundComments commentData={results.comments} />
        ) : value === 4 ? (
          <FoundPosts postData={results.posts} />
        ) : (
          <FoundUsers userData={results.users} />
        )}
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Pagination
            count={3}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
}
