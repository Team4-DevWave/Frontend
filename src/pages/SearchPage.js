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
import { Tab, Tabs } from "@mui/material";
import FoundUsers from "../layouts/SearchResultsTabs/FoundUsers";
import FoundCommunities from "../layouts/SearchResultsTabs/FoundCommunitites";

export default function SearchPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

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
      .get(`http://localhost:8001/api/v1/search/${query}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

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
      <div id="grid-2">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Users" />
          <Tab label="Communities" />
          <Tab label="Hashtags" />
          <Tab label="Comments" />
          <Tab label="Posts" />
        </Tabs>
        <hr/>

        {value === 0 ? <FoundUsers userData = {results.users}/> : value === 1 ? <FoundCommunities communityData = {results.communities}/> : value === 2 ? "hashtags" : value === 3 ? "comments" : "posts"}
      </div>
    </div>
  );
}
