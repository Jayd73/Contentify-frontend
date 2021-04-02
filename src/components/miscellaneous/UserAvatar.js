import React from "react";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

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
    borderWidth: 8,
    borderColor: theme.palette.appBg.dark,
    display: "block",
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

function UserAvatar({ editable, channelData }) {
  const classes = useStyles();
  const [userState, setUserState] = useUserState();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "avatarImg") {
      if (e.target.files.length === 0) {
        return;
      }
      const avatar = {
        avatarImg: e.target.files,
      };
      // console.log("Got", avatar);
      // console.log("type: ", typeof bannerImg.banner);
      let formData = new FormData();
      formData.append("avatar", avatar.avatarImg[0]);
      axiosInstance
        .put(`channel/upload/avatar/${userState.channelID}/`, formData)
        .then((res) => {
          // console.log(res.data);
          setUserState({ ...userState, userAvatar: res.data.avatar });
        })
        .catch((err) => console.log(err));
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
                id="avatar-file"
                name="avatarImg"
                type="file"
                onChange={handleChange}
              />

              <label htmlFor="avatar-file">
                <IconButton component="span">
                  <Avatar className={classes.badgeStyle}>
                    <AddAPhotoIcon fontSize="small" />
                  </Avatar>
                </IconButton>
              </label>
            </>
          }
        >
          <Avatar src={userState.userAvatar} className={classes.avatarStyle} />
        </Badge>
      ) : (
        <Avatar src={channelData.avatar} className={classes.avatarStyle} />
      )}
    </div>
  );
}

export default UserAvatar;
