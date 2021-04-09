import React from "react";
import { useHistory } from "react-router-dom";
import { useUserState } from "../../contexts/UserContext";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

import "../header/Header.css";
import TemporaryDrawer from "../drawer/TemporaryDrawer";
import ProfilePopover from "./ProfilePopover";
import { Icon } from "@material-ui/core";

import Popover from "@material-ui/core/Popover";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1500,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: "3em",
    objectFit: "contain",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerState, setDrawerState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userState, setUserState] = useUserState();
  const [searchText, setSearchText] = React.useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const open = Boolean(anchorElFilter);
  const id = open ? "simple-popover" : undefined;

  const [filterValue, setFilterValue] = React.useState("video");

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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

  const goSearch = () => {
    if (searchText.trim()) {
      history.push({
        pathname: `/search/${filterValue}/`,
        search: "?search=" + searchText,
      });
      window.location.reload();
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode == 13) {
      goSearch();
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right", zIndex: 1800 }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right", zIndex: 1800 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
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

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(!drawerState)}
          >
            <MenuIcon />
          </IconButton>

          <img
            className={classes.logo}
            src="/images/contentify-logo-v4.png"
            alt="Contentify"
            onClick={() => history.push("/videos")}
          />
          <div className={classes.grow} />
          <TextField
            variant="outlined"
            size="small"
            name="searchbox"
            placeholder="Search..."
            type="text"
            id="searchbox"
            className="searchbox"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={onKeyPress}
            style={{ marginRight: "6em" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => goSearch()}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={(event) =>
                      setAnchorElFilter(
                        anchorElFilter ? null : event.currentTarget
                      )
                    } //
                  >
                    <Icon>filter_list</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userState.userAvatar} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorElFilter}
              onClose={() => setAnchorElFilter(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ zIndex: 1600 }}
            >
              <FormControl
                component="fieldset"
                style={{
                  margin: "1.2em",
                }}
              >
                <FormLabel
                  component="legend"
                  style={{ marginBottom: "0.5em" }}
                  color="secondary"
                >
                  Filters
                </FormLabel>
                <RadioGroup
                  aria-label="filter"
                  name="filter1"
                  value={filterValue}
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    value="video"
                    control={<Radio color="primary" />}
                    label="Videos"
                  />
                  <FormControlLabel
                    value="audio"
                    control={<Radio color="primary" />}
                    label="Audios"
                  />
                  <FormControlLabel
                    value="userpost"
                    control={<Radio color="primary" />}
                    label="Posts"
                  />
                </RadioGroup>
              </FormControl>
            </Popover>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ProfilePopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <TemporaryDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
    </div>
  );
}
