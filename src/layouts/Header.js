import * as React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SideBar from "./Sidebar";
import Cookies from "js-cookie";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import TagIcon from "@mui/icons-material/Tag";
import Chat from "../components/Chat/ChatWindow.js";
import NotificationDropdown from "../components/NotificationDropdown";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchResults = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "20%",
  zIndex: 1,
  width: "70%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0 0 16px 16px",
  boxShadow: theme.shadows[5],
  maxHeight: "300px",
  overflowY: "auto",
  whiteSpace: "nowrap", // Prevent text wrapping
  display: "inline-block", // Allow the width to adjust to content
}));

const handleKeyPress = (event) => {
  if (event.key === "Enter") {

    window.location.href = `/search/${event.target.value}`;
  }
};

export default function Header() {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const fetchNotificationCount = () => {
    const bearerToken = Cookies.get('token');
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    axios.get('http://localhost:8000/api/v1/notifications', config)
      .then(response => {
        const unreadNotifications = response.data.data.notifications.filter(notification => !notification.read);
        setNotificationsCount(unreadNotifications.length);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    console.log("showChatttttttttttttttttttttttttttttttttttttt", showChat);
    fetchNotificationCount();
    const interval = setInterval(() => {
      fetchNotificationCount();
    }, 5000); // Fetches every 5 seconds

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const matches = useMediaQuery("(max-width:1350px)");
  const searchSize = useMediaQuery("(max-width:980px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const closeChatWindow = () => {
    console.log("closing chat window");
    setShowChat(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "16px",
          width: "200px",
        },
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className="header-item" onClick={handleMenuClose}>
        <a href="/profile" className="sub-menu-link" data-testid="profile-nav">
          <img
            src={process.env.PUBLIC_URL + "/images/erenyega.jpg"}
            alt="profile pic"
            className="rounded-circle"
            width="30px"
          />
          <p>View Profile</p>
        </a>
      </MenuItem>
      <MenuItem className="header-item" onClick={handleMenuClose}>
        <a href="#" className="sub-menu-link" data-testid="edit-avatar-nav">
          <svg
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="avatar-style-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            role="svg"
          >
            <path
              d="M14.8902 18.0001H5.19017C4.88389 18.0033 4.58842 17.8871 4.36631 17.6762C4.1442 17.4652 4.01289 17.1762 4.00017 16.8701V7.91415L3.87017 8.02915C3.65298 8.21948 3.37193 8.32079 3.08324 8.31282C2.79456 8.30485 2.51953 8.18818 2.31317 7.98615L0.340173 6.06115C0.233648 5.95781 0.148722 5.83434 0.0903304 5.6979C0.031939 5.56146 0.00124677 5.41477 3.72022e-05 5.26637C-0.00117237 5.11796 0.0271249 4.97079 0.0832845 4.83342C0.139444 4.69605 0.222346 4.5712 0.327173 4.46615L4.41217 0.340146C4.62876 0.123122 4.92257 0.000850433 5.22917 0.000145737H6.86617C7.13327 -0.00416369 7.3931 0.0872233 7.5987 0.257788C7.80429 0.428353 7.94209 0.666842 7.98717 0.930146C8.07621 1.39884 8.32601 1.82178 8.69349 2.12602C9.06097 2.43027 9.52309 2.59674 10.0002 2.59674C10.4773 2.59674 10.9394 2.43027 11.3069 2.12602C11.6743 1.82178 11.9241 1.39884 12.0132 0.930146C12.0583 0.666842 12.1961 0.428353 12.4016 0.257788C12.6072 0.0872233 12.8671 -0.00416369 13.1342 0.000145737H14.7712C15.0778 0.000850433 15.3716 0.123122 15.5882 0.340146L19.6742 4.46715C19.7788 4.57225 19.8615 4.69708 19.9175 4.8344C19.9734 4.97172 20.0016 5.11879 20.0003 5.26707C19.999 5.41536 19.9683 5.56191 19.9099 5.69822C19.8515 5.83453 19.7666 5.95789 19.6602 6.06115L17.6602 8.01315C17.4667 8.20076 17.2138 8.31478 16.9451 8.33541C16.6764 8.35605 16.409 8.28202 16.1892 8.12615L16.0002 7.95115V16.8701C16.0031 17.0177 15.9765 17.1643 15.922 17.3014C15.8676 17.4385 15.7862 17.5633 15.6828 17.6686C15.5794 17.7738 15.4561 17.8574 15.3199 17.9143C15.1838 17.9713 15.0377 18.0004 14.8902 18.0001ZM5.25017 5.12915V16.7521H14.7502V5.08615L16.8572 7.04815L18.7002 5.25515L14.7002 1.21915L13.2272 1.24815C13.0683 1.98574 12.6614 2.64661 12.0744 3.12064C11.4874 3.59466 10.7557 3.85322 10.0012 3.85322C9.24666 3.85322 8.51494 3.59466 7.92792 3.12064C7.34091 2.64661 6.93406 1.98574 6.77517 1.24815H5.22917L1.30017 5.25515L3.11417 7.02515L5.25017 5.12915Z"
              fill="currentColor"
            ></path>
          </svg>
          <p>Edit Avatar</p>
        </a>
      </MenuItem>
      <MenuItem className="header-item" onClick={handleMenuClose}>
        <a href="#" className="sub-menu-link" data-testid="dark-mode-nav">
          <svg
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="night-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            role="svg"
          >
            <path d="M9.875 19a9.073 9.073 0 0 1-8.48-5.78 1.094 1.094 0 0 1 .247-1.191 1.145 1.145 0 0 1 1.232-.255c1.13.449 2.361.587 3.564.4A6.89 6.89 0 0 0 12.17 6.44a6.806 6.806 0 0 0-.394-3.564 1.148 1.148 0 0 1 .255-1.231 1.1 1.1 0 0 1 1.193-.248 9.082 9.082 0 0 1 5.746 9.254 9.184 9.184 0 0 1-8.32 8.32 11.93 11.93 0 0 1-.775.028Zm-7.206-5.967A7.871 7.871 0 1 0 13.033 2.668 8.116 8.116 0 0 1 2.669 13.033Z"></path>
          </svg>
          <p>Dark Mode</p>
        </a>
      </MenuItem>
      <MenuItem className="header-item" onClick={handleMenuClose}>
        <a
          href="#"
          className="sub-menu-link"
          data-testid="log-out-nav"
          onClick={() => {
            Cookies.remove("token");
            window.location.href = "/login";
          }}
        >
          <svg
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="logout-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            role="svg"
          >
            <path d="M11.991 10.625H1v-1.25h10.991l-1.933-1.933.884-.884 3 3a.624.624 0 0 1 0 .884l-3 3-.884-.884 1.933-1.933ZM15.375 1h-9.75A2.629 2.629 0 0 0 3 3.625v.792h1.25v-.792A1.377 1.377 0 0 1 5.625 2.25h9.75a1.377 1.377 0 0 1 1.375 1.375v12.75a1.377 1.377 0 0 1-1.375 1.375h-9.75a1.377 1.377 0 0 1-1.375-1.375v-.792H3v.792A2.63 2.63 0 0 0 5.625 19h9.75A2.63 2.63 0 0 0 18 16.375V3.625A2.63 2.63 0 0 0 15.375 1Z"></path>
          </svg>
          <p>Log Out</p>
        </a>
      </MenuItem>
      <MenuItem className="header-item" onClick={handleMenuClose}>
        <hr />
        <a
          href="/settings"
          className="sub-menu-link"
          data-testid="settings-nav"
        >
          <svg
            rpl=""
            fill="currentColor"
            height="20"
            icon-name="settings-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            role="svg"
          >
            <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
          </svg>
          <p>Settings</p>
        </a>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <Badge badgeContent={notificationsCount} color="error">
          <NotificationsIcon />
        </Badge>

        <p>Notifications</p>




      </MenuItem>

      <MenuItem>
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        <IconButton onClick={() => { setShowChat(true) }}
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
        >



          <Badge color="error">
            <svg

              rpl=""
              fill="currentColor"
              height="20"
              icon-name="chat-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              role="svg"
            >
              <path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264c-1.28-.3-2.606-.345-3.903-.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z"></path>
            </svg>
          </Badge>

          {showChat && <Chat onClose={closeChatWindow} />}

          <p>Chat</p>


        </IconButton>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  const [results, setResults] = React.useState({});

  React.useEffect(() => {
    console.log("attempting to fetch data");
    if (search) {
      //remove hashtag from search
      search.replace("#", "");
      axios
        .get(`http://localhost:8000/api/v1/homepage/search?q=${search}&sort=Top&page=1`)
        .then((response) => {
          setResults(response.data.data.subreddits.slice(0, 4));


          console.log(results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [search]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",

          borderBottom: "1px solid #e0e0e0",
          color: "black",
        }}
      >
        <Toolbar>
          {matches && (
            <React.Fragment>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <a href="/home" style={{ padding: 20 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/images/threadditweb.png"}
                    alt="threadit logo"
                    height="40"
                  />
                </a>
                <SideBar />
              </Drawer>
            </React.Fragment>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <a className="navbar-brand" href="/home">
              <img
                src={process.env.PUBLIC_URL + "/images/threadditweb.png"}
                alt="threadit logo"
                height="40"
              />
            </a>
          </Typography>
          <Search
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsSearchActive(false);
              }, 200); // 200ms delay
            }}
            onKeyDown={(e) => handleKeyPress(e)}
            style={{
              backgroundColor: "#d3d3d3",
              borderRadius: "20px",
              width: !searchSize ? "50%" : "",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon onClick={() => navigate(`/search/${search}`)} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                width: "100%",
              }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {isSearchActive && search && (
            <SearchResults>
              <Typography variant="h6" style={{ padding: "10px" }}>
                Communities
              </Typography>
              <List>

                {results && results.length > 0 &&
                  results.map((community, i) => (
                    <ListItem
                      key={i}
                      style={{
                        left: 0,
                      }}
                    >
                      <a
                        href={`/r/${community.name}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img src={community.srLooks.icon} alt="icon" width="35px" height="35px"
                          style={{ marginRight: "10px", borderRadius: "50px" }}
                        />


                        <p>t/{community.name}</p>
                      </a>
                    </ListItem>
                  ))}


                <ListItem
                  style={{
                    left: 0,
                  }}
                  onClick={() => navigate(`/search/${search}`)}
                >
                  {" "}
                  <Link
                    to={`/search/${search}`}
                    style={{ textDecoration: "none" }}
                  >
                    All results for {search}
                  </Link>
                </ListItem>
              </List>
            </SearchResults>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <IconButton onClick={() => {
              console.log('IconButtonnnnnnnnnnnnnnnnnnnnnnnnnnn clicked');
              setShowChat(true);
            }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <svg

                  rpl=""
                  fill="currentColor"
                  height="20"
                  icon-name="chat-outline"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  role="svg"
                >
                  <path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264c-1.28-.3-2.606-.345-3.903-.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z"></path>
                </svg>
              </Badge>

              {showChat && <Chat onClose={closeChatWindow} />}


            </IconButton>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={notificationsCount} color="error">
                <NotificationDropdown />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img
                src={process.env.PUBLIC_URL + "/images/erenyega.jpg"}
                alt="profile pic"
                className="rounded-circle"
                width="30px"
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}