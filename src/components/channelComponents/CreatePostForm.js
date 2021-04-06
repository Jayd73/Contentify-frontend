import React from "react";
import axiosInstance from "../../axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, Typography } from "@material-ui/core";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import EmojiTextField from "../customizedComponents/EmojiTextField";
let dayjs = require("dayjs");

const mainWidth = 30;
const maxChars = 380;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    marginTop: "1em",
    padding: "3em",
    paddingTop: "2em",
    position: "sticky",
    display: "flex",
    justifyContent: "center",

    // border: "3px solid red",
  },
  container: {
    maxWidth: "fit-content",
    marginRight: "1em",
    // border: "3px solid blue",
  },
  previewImg: {
    width: `${mainWidth}em`,
    height: "24em",
    objectFit: "contain",
    marginTop: "0.1em",
    marginBottom: "0.5em",
    marginLeft: "1em",
    border: `1px solid ${theme.palette.secondary.dark}`,
    backgroundColor: "black",
  },

  btnStyle: {
    width: "10em",
    height: "2.9em",
    margin: "1em",
  },
  remainingCharsStyle: {
    color: theme.palette.secondary.dark,
    fontSize: "1.3em",
    fontWeight: "bold",
    margin: "1em 0em",
    textAlign: "center",
  },
}));

function CreatePostForm({ setShowForm }) {
  const classes = useStyles();
  const history = useHistory();
  const [userState, setUserState] = useUserState();
  const [imgURL, setImgURL] = React.useState();
  const [remainingChars, setRemainingChars] = React.useState(maxChars);
  const [textContent, setTextContent] = React.useState("");
  const [userPostImg, setUserPostImg] = React.useState(null);

  function get_currtime_slug() {
    const slug =
      Math.random().toString(36).substr(2, 8) +
      dayjs().format("SSSssmmHHDMMYY");
    return slug;
  }

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.name === "postImg") {
      if (e.target.files.length === 0) {
        return;
      }
      var imgFile = e.target.files[0];
      var url = URL.createObjectURL(imgFile);
      setUserPostImg(imgFile);
      setImgURL(url);
    }
  };

  const handleTextChange = (e, emSetText) => {
    if (remainingChars == 0 && e.target.value.length > maxChars) {
      emSetText(e.target.value.slice(0, -2));
      return;
    }
    setRemainingChars(
      maxChars -
        (e.target.value.match(/./gu) ? e.target.value.match(/./gu).length : 0)
    );
    setTextContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textContent.length == 0) {
      return;
    }
    let formData = new FormData();
    formData.append("content", textContent);
    if (userPostImg) {
      formData.append("image", userPostImg);
    }
    formData.append("slug", get_currtime_slug());
    axiosInstance.post(`userpost/create/`, formData);
    history.push(`/channel/${userState.moreChannelData.slug}/posts`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <input
              style={{ display: "none" }}
              accept="image/*"
              className={classes.input}
              id="post-image-file"
              name="postImg"
              type="file"
              onChange={handleImage}
            />
            <label htmlFor="post-image-file">
              <Button
                className={classes.btnStyle}
                style={{ marginTop: 0 }}
                variant="contained"
                color="primary"
                endIcon={<Icon>image</Icon>}
                component="span"
              >
                Add image
              </Button>
            </label>
            {imgURL ? <img src={imgURL} className={classes.previewImg} /> : ""}
          </div>
          <div style={{ marginLeft: "2em" }}>
            <EmojiTextField
              style={{ width: `${mainWidth}em` }}
              variant="outlined"
              placeholder="Text"
              multiline
              value={textContent}
              inputProps={{ maxLength: maxChars }}
              onChange={handleTextChange}
              rows={10}
              component="pre"
              size="small"
              name="textContent"
              type="text"
              id="textContent"
            />
            <Typography className={classes.remainingCharsStyle}>
              {remainingChars}{" "}
              {remainingChars == 1 ? "character" : "characters"} remaining
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // border: "3px solid blue",
              }}
            >
              <Button
                className={classes.btnStyle}
                variant="contained"
                color="secondary"
                endIcon={<Icon>close</Icon>}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                className={classes.btnStyle}
                variant="contained"
                color="primary"
                endIcon={<Icon>publish</Icon>}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostForm;
