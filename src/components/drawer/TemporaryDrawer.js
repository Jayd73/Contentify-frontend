import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";

import axiosInstance from "../../axios";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200,
  },
  paper: {
    // backgroundColor: "#0c1729",
    width: "12em",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const TemporaryDrawer = (props) => {
  const { drawerState, toggleDrawer, history } = props;
  const [userState, setUserState] = useUserState();
  const classes = useStyles();

  const homeSection = [
    {
      name: "Videos",
      icon: <OndemandVideoIcon />,
      onClick: () => {
        axiosInstance
          .get(`video/`)
          .then((res) => {
            const allVideos = res.data;
            history.push({ pathname: "/videos", state: allVideos });
          })
          .catch((err) => {
            console.log("Error from API: ", err);
          });
      },
    },
    {
      name: "Audios",
      icon: <AudiotrackIcon />,
      onClick: () => {
        axiosInstance
          .get(`audio/`)
          .then((res) => {
            history.push({ pathname: "/audios", state: res.data });
          })
          .catch((err) => {
            console.log("Error from API: ", err);
          });
      },
    },
    {
      name: "Posts",
      icon: <Icon>article</Icon>,
      onClick: () => {
        axiosInstance
          .get(`userpost/`)
          .then((res) => {
            const allPosts = res.data;
            history.push({ pathname: "/posts", state: allPosts });
          })
          .catch((err) => {
            console.log("Error from API: ", err);
          });
      },
    },
  ];

  const otherOptions = [
    {
      name: "Following",
      icon: <Icon>person_add</Icon>,
      onClick: () => {
        axiosInstance
          .get(`/channel/${userState.moreChannelData.id}/`)
          .then((res) => {
            const followedChannels = res.data.followedChannels;
            console.log("followed: \n", followedChannels);
            history.push({
              pathname: `/channel/${userState.moreChannelData.slug}/following`,
              state: followedChannels,
            });
          })
          .catch((err) => {
            console.log("Error from API: ", err);
          });
      },
    },
  ];

  const drawerContents = () => (
    <div className={classes.list}>
      <List>
        <ListSubheader>HOME</ListSubheader>
        {homeSection.map((item) => (
          <ListItem button key={item.name} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {otherOptions.map((item) => (
          <ListItem button key={item.name} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor="left"
      open={drawerState}
      onClose={toggleDrawer(false)}
    >
      <div className={classes.drawerHeader} />
      {drawerContents()}
    </Drawer>
  );
};

export default withRouter(TemporaryDrawer);
