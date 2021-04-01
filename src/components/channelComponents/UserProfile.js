import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Typography } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import DoneIcon from "@material-ui/icons/Done";
import Popover from "@material-ui/core/Popover";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

let dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1em 2.5em",
  },

  heading: {
    color: theme.palette.secondary.dark,
    display: "flex",
  },
  textContent: {
    fontSize: "1.2em",
    marginTop: "0.5em",
  },
  joinedDate: {
    color: theme.palette.secondary.main,
    marginTop: "2em",
    fontWeight: "bold",
    fontSize: "1.2em",
  },
}));

function UserProfile() {
  const classes = useStyles();
  const [userState, setUserState] = useUserState();
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isLoggedUser = true;

  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

  const handleEmojiPopover = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleChange = (e) => {
    setUserState({
      ...userState,
      channelAbout: e.target.value,
    });
  };

  const onEmojiClick = (emojiObject) => {
    setUserState({
      ...userState,
      channelAbout: userState.channelAbout + emojiObject.native,
    });
  };

  const handleClick = () => {
    if (isEditingAbout) {
      const aboutText = userState.channelAbout.trim()
        ? userState.channelAbout
        : "No description";
      setUserState({ ...userState, channelAbout: aboutText });
      axiosInstance
        .put(`channel/changeabout/${userState.channelID}/`, {
          about: aboutText,
        })
        .catch((err) =>
          console.log("Error while changing about: \n", err.response.data)
        );
    }
    setIsEditingAbout(!isEditingAbout);
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <h1>About</h1>
        {isLoggedUser ? (
          <IconButton
            style={{ marginTop: "-0.2em", marginLeft: "0.3em" }}
            onClick={handleClick}
          >
            <EditIcon color="primary" />
          </IconButton>
        ) : (
          ""
        )}
      </div>
      {isEditingAbout ? (
        <>
          <TextField
            variant="outlined"
            multiline
            component="pre"
            size="small"
            name="searchbox"
            type="text"
            id="about"
            value={userState.channelAbout}
            onChange={handleChange}
            style={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    elevation={0}
                    onClick={handleEmojiPopover}
                  >
                    <InsertEmoticonOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{ height: "3em", marginTop: "1em" }}
            variant="contained"
            color="primary"
            endIcon={<DoneIcon />}
            onClick={handleClick}
          >
            Done
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Picker onSelect={onEmojiClick} />
          </Popover>
        </>
      ) : (
        <pre className={classes.textContent}>{userState.channelAbout}</pre>
      )}
      <Typography className={classes.joinedDate}>
        Joined on {dayjs(userState.createdAt).format("MMMM DD, YYYY")}
      </Typography>
    </div>
  );
}

export default UserProfile;
