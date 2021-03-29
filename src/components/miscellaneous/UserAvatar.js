import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(-5),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatarStyle: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: theme.palette.appBg.dark,
  },
  badgeStyle: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
  },
}));

function UserAvatar({ editable }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {editable ? (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <IconButton>
              <Avatar className={classes.badgeStyle}>
                <AddAPhotoIcon fontSize="small" />
              </Avatar>
            </IconButton>
          }
        >
          <Avatar
            src="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
            className={classes.avatarStyle}
          />
        </Badge>
      ) : (
        <Avatar
          src="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          className={classes.avatarStyle}
        />
      )}
    </div>
  );
}

export default UserAvatar;
