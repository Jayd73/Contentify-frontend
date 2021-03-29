import React from "react";
import { useState } from "react";
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
    borderWidth: 6,
    borderColor: theme.palette.appBg.dark,
  },
  badgeStyle: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
  },
  input: {
    display: "none",
  },
}));

function UserAvatar({ editable }) {
  const classes = useStyles();
  const [postimage, setPostImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] == "avatarImg") {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    }
  };

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
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                name="avatarImg"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span">
                  <Avatar className={classes.badgeStyle}>
                    <AddAPhotoIcon fontSize="small" />
                  </Avatar>
                </IconButton>
              </label>
            </>
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
