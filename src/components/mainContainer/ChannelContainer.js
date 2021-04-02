import React from "react";
import axiosInstance from "../../axios";

import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import { useHistory, useParams } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
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
import InfoIcon from "@material-ui/icons/Info";

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
  const { channelSlug } = useParams();
  const [userState, setUserState] = useUserState();
  const [channelData, setChannelData] = useState({});
  let [userIsFollowing, setUserIsFollowing] = useState();

  useEffect(() => {
    axiosInstance
      .get(`channel/${channelSlug}/`)
      .then((res) => {
        setChannelData(res.data);

        // console.log("Res: ", isFollowing());
      })
      .catch((err) => {
        console.log("Error while fetching: \n", err.response.data);
      });
  }, [setChannelData]);

  const channelSection = [
    {
      name: "About",
      icon: <InfoIcon />,
      onClick: () => history.push(`/channel/${channelSlug}`),
    },
    {
      name: "Videos",
      icon: <OndemandVideoIcon />,
      onClick: () => history.push(`/channel/${channelSlug}/videos`),
    },
    {
      name: "Audios",
      icon: <AudiotrackIcon />,
      onClick: () => history.push(`/channel/${channelSlug}/audios`),
    },
    {
      name: "Posts",
      icon: <PostAddIcon />,
      onClick: () => history.push(`/channel/${channelSlug}/posts`),
    },
  ];

  function isFollowing() {
    if (userIsFollowing) {
      return userIsFollowing;
    }
    userIsFollowing =
      userState.moreChannelData.followedChannels &&
      userState.moreChannelData.followedChannels.some(
        (otherChannel) => otherChannel.id === channelData.id
      );
    return (
      userState.moreChannelData.followedChannels &&
      userState.moreChannelData.followedChannels.some(
        (otherChannel) => otherChannel.id === channelData.id
      )
    );
  }

  const addFollower = () => {
    if (userIsFollowing) {
      axiosInstance
        .put(`channel/removefollower/${channelData.id}/`)
        .then((res) => {
          console.log("Follow data:\n", res.data);
          setUserState({ ...userState, moreChannelData: res.data });
          axiosInstance
            .get(`channel/${channelData.id}/`)
            .then((res) => {
              setChannelData(res.data);
            })
            .catch((err) => console.log(err));
          setUserIsFollowing(false);
        })
        .catch((err) => console.log("Errors from API: ", err));
    } else {
      axiosInstance
        .put(`channel/addfollower/${channelData.id}/`)
        .then((res) => {
          setUserState({ ...userState, moreChannelData: res.data });
          setChannelData({
            ...channelData,
            followers: res.data.followedChannels.filter(
              (fc) => fc.id === channelData.id
            )[0].followers,
          });
          setUserIsFollowing(true);
        })
        .catch((err) => console.log("Errors from API: ", err));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "banner") {
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
        <img
          src={
            channelData.id === userState.channelID
              ? userState.channelBanner
              : channelData.banner
          }
          className={classes.bannerImg}
        />
        {channelData.id === userState.channelID ? (
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
        <UserAvatar
          editable={channelData.id === userState.channelID}
          channelData={channelData}
        />
        <div className={classes.nameAndFollowers}>
          <Typography variant="h4" className={classes.userameStyle}>
            {channelData.user && channelData.user.username}
          </Typography>
          <Typography variant="h6" className={classes.following}>
            {channelData.followers && channelData.followers} followers
          </Typography>
        </div>
        <div className={classes.grow}></div>

        <Button
          style={{ height: "3.5em", marginTop: "2.5em", marginRight: "4em" }}
          variant="contained"
          color={isFollowing() ? "secondary" : "primary"}
          size="large"
          disabled={channelData.id === userState.channelID}
          onClick={addFollower}
        >
          {isFollowing() ? "Unfollow" : "Follow"}
        </Button>
      </div>
      <ChildComponent editable={channelData.id === userState.channelID} />
    </div>
  );
}

export default ChannelContainer;
