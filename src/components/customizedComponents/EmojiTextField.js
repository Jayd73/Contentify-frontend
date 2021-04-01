import React from "react";
import { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import InputAdornment from "@material-ui/core/InputAdornment";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import Popover from "@material-ui/core/Popover";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function EmojiTextField(props) {
  const { initialText, onChangeCallback } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = React.useState(initialText);
  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;
  let filteredProps = {};

  useEffect(() => {
    console.log(props);
    for (let prop in props) {
      if (prop != "initialText" && prop != "onChangeCallback") {
        filteredProps[prop] = props[prop];
      }
    }
    console.log("Filtered: ", filteredProps);
  }, []);

  const handleEmojiPopover = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (onChangeCallback) {
      onChangeCallback(e);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText(text + emojiObject.native);
  };

  return (
    <>
      <TextField
        {...filteredProps}
        onChange={handleChange}
        value={text}
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
  );
}

export default EmojiTextField;
