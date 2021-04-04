import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Icon, Typography } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import DoneIcon from "@material-ui/icons/Done";

// import Popover from "@material-ui/core/Popover";
// import "emoji-mart/css/emoji-mart.css";
// import { Emoji, Picker } from "emoji-mart";

import EmojiTextField from "../customizedComponents/EmojiTextField";

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
    display: "flex",
    alignItems: "center",
  },
}));

function UserProfile({ editable }) {
  const classes = useStyles();
  const { channelSlug } = useParams();
  const [userState, setUserState] = useUserState();
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    axiosInstance.get(`channel/${channelSlug}/`).then((res) => {
      setChannelData(res.data);
      // console.log(res.data);
    });
  }, []);

  const isLoggedUser = editable;

  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

  const handleEmojiPopover = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleChange = (e) => {
    setChannelData({ ...channelData, about: e.target.value });
  };

  // const onEmojiClick = (emojiObject) => {
  //   // setUserState({
  //   //   ...userState,
  //   //   channelAbout: userState.channelAbout + emojiObject.native,
  //   // });

  //   setChannelData({
  //     ...channelData,
  //     about: channelData.about + emojiObject.native,
  //   });
  // };

  const handleClick = () => {
    if (isEditingAbout) {
      const aboutText = channelData.about.trim()
        ? channelData.about
        : "No description";
      setChannelData({ ...channelData, about: aboutText });
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
          <EmojiTextField
            variant="outlined"
            multiline
            component="pre"
            size="small"
            name="about"
            type="text"
            id="about"
            value={channelData.about}
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
          {/* <Popover
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
          </Popover> */}

          <Button
            style={{ height: "3em", marginTop: "1em" }}
            variant="contained"
            color="primary"
            endIcon={<DoneIcon />}
            onClick={handleClick}
          >
            Done
          </Button>
        </>
      ) : (
        <pre className={classes.textContent}>{channelData.about}</pre>
      )}
      <Typography className={classes.joinedDate}>
        <Icon>date_range</Icon> &nbsp; Joined on{" "}
        {dayjs(channelData.created_date).format("MMMM DD, YYYY")}
      </Typography>
    </div>
  );
}

export default UserProfile;
