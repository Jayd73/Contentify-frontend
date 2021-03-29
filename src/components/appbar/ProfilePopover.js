import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  typography: {
    marginLeft: "-0.5em",
  },
}));

function ProfilePopover({ anchorEl, setAnchorEl }) {
  const classes = useStyles();
  const history = useHistory();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverActions = [
    {
      name: "My Profile",
      icon: <PersonIcon />,
      onClick: () => history.push("/channel/cname"),
    },
    {
      name: "Sign out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/logout"),
    },
  ];

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <ListItem key={"userimg"} style={{ height: "6em" }}>
        <ListItemAvatar>
          <Avatar
            style={{ height: "2.5em", width: "2.5em" }}
            src="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="h6" style={{ marginLeft: "0.5em" }}>
            National Geographic
          </Typography>
          <Typography style={{ fontSize: "1em", marginLeft: "0.6em" }}>
            natgeo@gmail.com
          </Typography>
        </ListItemText>
      </ListItem>
      <Divider />
      {popoverActions.map((item) => (
        <ListItem
          button
          key={item.name}
          onClick={item.onClick}
          style={{ height: "3em" }}
        >
          <ListItemAvatar>{item.icon}</ListItemAvatar>
          <ListItemText className={classes.typography} primary={item.name} />
        </ListItem>
      ))}
    </Popover>
  );
}

export default ProfilePopover;
