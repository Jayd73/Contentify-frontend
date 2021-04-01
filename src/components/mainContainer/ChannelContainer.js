import React from "react";
import axiosInstance from "../../axios";

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import UserAvatar from "../miscellaneous/UserAvatar";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import PostAddIcon from "@material-ui/icons/PostAdd";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: -10,
    width: window.innerWidth - drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.textColor,
  },
  drawerContainer: {
    overflow: "auto",
  },
  iconStyle: {
    color: theme.palette.secondary.iconColor,
    paddingLeft: "0.5em",
  },
  bannerImg: {
    height: 260,
    width: "100%",
    objectFit: "cover",
  },
  channelHeader: {
    marginTop: "-4px",
    paddingBottom: "0.5em",
    display: "flex",
    backgroundColor: theme.palette.appBg.dark,
  },
  userameStyle: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: "bold",
  },
  following: {
    fontWeight: "bold",
    color: theme.palette.appBg.darker,
  },
  nameAndFollowers: {
    marginTop: "1.5em",
    marginLeft: "1.5em",
  },
  grow: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

function ChannelContainer({ ChildComponent }) {
  const classes = useStyles();
  const history = useHistory();
  const [userState, setUserState] = useUserState();
  const [postImage, setPostImage] = useState(null);
  const editable = true;

  const channelSection = [
    {
      name: "Videos",
      icon: <OndemandVideoIcon />,
      onClick: () => history.push("/channel/cname/videos"),
    },
    {
      name: "Audios",
      icon: <AudiotrackIcon />,
      onClick: () => history.push("/channel/cname/audios"),
    },
    {
      name: "Posts",
      icon: <PostAddIcon />,
      onClick: () => history.push("/channel/cname/posts"),
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    if ([e.target.name] == "banner") {
      // console.log("found banner");
      // console.log("Target files: ", e.target.files);
      if (e.target.files.length == 0) {
        return;
      }
      const bannerImg = {
        banner: e.target.files,
      };
      // console.log("Got", bannerImg);
      // console.log("type: ", typeof bannerImg.banner);
      let formData = new FormData();
      formData.append("banner", bannerImg.banner[0]);
      axiosInstance
        .put(`channel/upload/banner/${userState.channelID}/`, formData)
        .then((res) => {
          // console.log(res.data);
          setUserState({ ...userState, channelBanner: res.data.banner });
          // console.log("New banner: ", userState.channelBanner);
        })
        .catch((err) => console.log(err));
    }
  };

  const sideBarContents = () => (
    <div>
      <List>
        <ListSubheader
          style={{ color: "white", fontSize: "1em", paddingLeft: "1.5em" }}
        >
          CHANNEL
        </ListSubheader>
        {channelSection.map((item) => (
          <ListItem button key={item.name} onClick={item.onClick}>
            <ListItemIcon className={classes.iconStyle}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {Object.keys(otherOptions).map((key) => (
          <ListItem button key={key}>
            <ListItemIcon>{otherOptions[key]}</ListItemIcon>
            <ListItemText primary={key} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="right"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{sideBarContents()}</div>
      </Drawer>
      <div>
        <img src={userState.channelBanner} className={classes.bannerImg} />
        {editable ? (
          <>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              name="banner"
              type="file"
              onChange={handleChange}
            />

            <label htmlFor="icon-button-file">
              <Button
                color="primary"
                variant="contained"
                component="span"
                style={{
                  position: "absolute",
                  marginTop: "15.5em",
                  marginLeft: "-6em",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <AddAPhotoIcon fontSize="small" />
              </Button>
            </label>
          </>
        ) : (
          ""
        )}
      </div>

      <div className={classes.channelHeader}>
        <UserAvatar editable />
        <div className={classes.nameAndFollowers}>
          <Typography variant="h4" className={classes.userameStyle}>
            {userState.username}
          </Typography>
          <Typography variant="h6" className={classes.following}>
            {userState.followers} followers
          </Typography>
        </div>
        <div className={classes.grow}></div>
        <Button
          style={{ height: "3.5em", marginTop: "2.5em", marginRight: "4em" }}
          variant="contained"
          color="primary"
          size="large"
        >
          Follow
        </Button>
      </div>
      <ChildComponent />
    </div>
  );
}

export default ChannelContainer;
