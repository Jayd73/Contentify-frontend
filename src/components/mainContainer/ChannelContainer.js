import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import UserAvatar from "../miscellaneous/UserAvatar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "-0.47em",
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
  },
  bannerImg: {
    height: "16em",
    width: "100%",
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
  const editable = true;

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
        <div className={classes.drawerContainer}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon className={classes.iconStyle} />
                  ) : (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <div>
        <img
          src="https://vistapointe.net/images/cosmos-a-spacetime-odyssey-wallpaper-10.jpg"
          className={classes.bannerImg}
        />
        {editable ? (
          <>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              name="bannerImg"
              type="file"
            />

            <label htmlFor="icon-button-file">
              <Button
                color="primary"
                variant="contained"
                component="span"
                style={{
                  position: "absolute",
                  marginTop: "15em",
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
            National Geographic
          </Typography>
          <Typography variant="h6" className={classes.following}>
            2.5M followers
          </Typography>
        </div>
        <div className={classes.grow}></div>
        <Button
          style={{ height: "3.5em", marginTop: "2em", marginRight: "4em" }}
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
