import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200,
  },
  paper: {
    // backgroundColor: "#0c1729",
    width: "13em",
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

  const otherOptions = {
    Following: <SubscriptionsIcon />,
    "My playlists": <PlaylistPlayIcon />,
  };
  const classes = useStyles();

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
        {Object.keys(otherOptions).map((key) => (
          <ListItem button key={key}>
            <ListItemIcon>{otherOptions[key]}</ListItemIcon>
            <ListItemText primary={key} />
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
