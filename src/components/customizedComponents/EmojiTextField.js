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
  let valueText = props.value ? props.value : "";
  const onChangeCallback = props.onChange;
  const textInpRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = React.useState(valueText);
  const open = Boolean(anchorEl);
  const id = open ? "emoji-popover" : undefined;

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
    if (onChangeCallback) {
      const e = { target: { value: text + emojiObject.native } };
      onChangeCallback(e, setText);
    }
  };

  return (
    <>
      <TextField
        {...props}
        onChange={handleChange}
        value={text}
        inputRef={textInpRef}
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
