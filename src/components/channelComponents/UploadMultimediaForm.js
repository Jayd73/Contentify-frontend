import React from "react";
import { useState } from "react";
import axiosInstance from "../../axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CardMedia, Icon, Typography } from "@material-ui/core";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import EmojiTextField from "../customizedComponents/EmojiTextField";

let dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "2em",
    paddingTop: "0.5em",
    paddingRight: "3em",
  },

  textFieldStyle: {
    width: "100%",
    marginTop: "1em",
    marginBottom: "1em",
  },

  mediaBtnContainer: {
    display: "flex",
    maxWidth: "fit-content",
    marginRight: "1em",
    alignItems: "center",
    // border: "3px solid blue",
  },

  fileNameStyle: {
    color: theme.palette.secondary.main,
    fontSize: "1.2em",
    fontWeight: "bold",
    marginLeft: "1em",
    marginTop: "0.4em",
  },

  previewImg: {
    width: "30em",
    height: "16.8em",
    marginBottom: "1.5em",
    border: `1px solid ${theme.palette.secondary.dark}`,
    backgroundColor: "black",
  },

  btnStyle: {
    width: "13em",
    height: "2.9em",
    marginTop: "1em",
    marginBottom: "0.5em",
  },
}));

function UploadMultimediaForm({ type, setShowForm }) {
  const classes = useStyles();
  const history = useHistory();
  const mediaFormData = {
    title: "",
    description: "",
  };
  const errors = {
    titleErr: "",
    pictureErr: "",
    mediaFileErr: "",
  };

  const maxTitleLen = 200;
  const maxDescrpLen = 10000;
  const [userState, setUserState] = useUserState();
  const [formData, setFormData] = useState(mediaFormData);
  const [fieldErrors, setFieldErrors] = useState(errors);
  const [picture, setPicture] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [mediaFile, setMediaFile] = useState();
  const [mediaFileName, setMediaFileName] = useState();
  const [mediaFileDur, setMediaFileDur] = useState(1);

  function slugify(string) {
    return (
      string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "") +
      Math.random().toString(36).substr(2, 4) +
      dayjs().format("SSSss")
    );
  }

  function uploadToDB(fileDur) {
    let mediaFormData = new FormData();
    mediaFormData.append("title", formData.title);
    mediaFormData.append("description", formData.description);
    mediaFormData.append("slug", slugify(formData.title));
    mediaFormData.append("file", mediaFile);
    mediaFormData.append("duration", fileDur);
    if (type == "video") {
      mediaFormData.append("thumbnail", picture);
      axiosInstance.post(`video/create/`, mediaFormData);
      history.push(`/channel/${userState.moreChannelData.slug}/videos`);
    } else {
      mediaFormData.append("cover", picture);
      axiosInstance.post(`audio/create/`, mediaFormData);
      history.push(`/channel/${userState.moreChannelData.slug}/audios`);
    }
  }

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.name === "picture") {
      if (e.target.files.length === 0) {
        return;
      }
      var imgFile = e.target.files[0];
      var url = URL.createObjectURL(imgFile);
      setPicture(imgFile);
      setPreviewURL(url);
    }
  };

  const handleMediaFile = (e) => {
    e.preventDefault();
    if (e.target.name === "mediaFile") {
      if (e.target.files.length === 0) {
        return;
      }
      var mediaFile = e.target.files[0];
      setMediaFile(mediaFile);
      setMediaFileName(mediaFile.name);
      setFieldErrors({
        ...fieldErrors,
        mediaFileErr: "",
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    let titleError = "",
      pictureError = "",
      fileErr = "";

    const videoFileExt = [
      "mp4",
      "m4v",
      "mkv",
      "avi",
      "mov",
      "mpeg",
      "3gp",
      "ogg",
    ];
    const audioFileExt = ["mp3", "m4a", "webm", "flac"];

    const currExt = type == "video" ? videoFileExt : audioFileExt;

    if (formData.title === "") {
      titleError = "A title is required";
    }
    if (!picture) {
      pictureError = "Please choose a picture";
    }
    if (!mediaFile) {
      fileErr = `Please select ${type === "video" ? "a" : "an"} ${type} file`;
    } else if (!currExt.includes(mediaFile.name.split(".").pop())) {
      fileErr = `Not a valid ${type} file`;
    }
    setFieldErrors({
      ...fieldErrors,
      titleErr: titleError,
      pictureErr: pictureError,
      mediaFileErr: fileErr,
    });

    if (!titleError && !pictureError && !fileErr) {
      var mediaElement = document.createElement(type);
      mediaElement.preload = "metadata";

      mediaElement.onloadedmetadata = function () {
        window.URL.revokeObjectURL(mediaElement.src);
        if (mediaElement.duration < 1) {
          console.log("Invalid multimedia ! multimedia is less than 1 second");
          return;
        }
        uploadToDB(Math.floor(mediaElement.duration));
      };
      mediaElement.src = URL.createObjectURL(mediaFile);
    }
  };

  return (
    <div className={classes.root}>
      <EmojiTextField
        className={classes.textFieldStyle}
        variant="outlined"
        label="Title"
        multiline
        required
        value={mediaFormData.title}
        inputProps={{ maxLength: maxTitleLen }}
        onChange={handleTextChange}
        helperText={fieldErrors.titleErr}
        error={fieldErrors.titleErr ? true : false}
        component="pre"
        size="small"
        name="title"
        type="text"
        id="title"
      />

      <EmojiTextField
        variant="outlined"
        className={classes.textFieldStyle}
        label="Description"
        multiline
        value={mediaFormData.description}
        inputProps={{ maxLength: maxDescrpLen }}
        onChange={handleTextChange}
        component="pre"
        size="small"
        name="description"
        type="text"
        id="description"
      />
      <div className={classes.mediaBtnContainer}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="picture-file"
          name="picture"
          type="file"
          onChange={handleImage}
        />
        <label htmlFor="picture-file">
          <Button
            className={classes.btnStyle}
            variant="contained"
            color="primary"
            endIcon={<Icon>image</Icon>}
            component="span"
          >
            Add {type == "video" ? "picture" : "cover"}
          </Button>
        </label>
        {!picture ? (
          <Typography
            className={classes.fileNameStyle}
            style={{ color: "red" }}
          >
            {fieldErrors.pictureErr}
          </Typography>
        ) : (
          ""
        )}
      </div>

      <br />
      {previewURL ? (
        <CardMedia
          className={classes.previewImg}
          image={previewURL}
          style={type === "video" ? {} : { width: 224, height: 256 }}
        />
      ) : (
        ""
      )}
      <div className={classes.mediaBtnContainer}>
        <input
          style={{ display: "none" }}
          accept={type == "video" ? "*" : "audio/*"}
          id="media-file"
          name="mediaFile"
          type="file"
          onChange={handleMediaFile}
        />
        <label htmlFor="media-file">
          <Button
            className={classes.btnStyle}
            style={{ marginTop: 0 }}
            variant="contained"
            color="primary"
            endIcon={<Icon>insert_drive_file</Icon>}
            component="span"
          >
            Add {type} file
          </Button>
        </label>
        {!fieldErrors.mediaFileErr ? (
          <Typography
            className={classes.fileNameStyle}
            style={{ marginTop: 0, marginBottom: "0.5em" }}
          >
            {mediaFileName}
          </Typography>
        ) : (
          <Typography
            className={classes.fileNameStyle}
            style={{ color: "red", marginTop: 0, marginBottom: "0.5em" }}
          >
            {fieldErrors.mediaFileErr}
          </Typography>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.3em",
          // border: "3px solid blue",
        }}
      >
        <Button
          className={classes.btnStyle}
          style={{ marginBottom: "2em" }}
          variant="contained"
          color="secondary"
          endIcon={<Icon>close</Icon>}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.btnStyle}
          style={{ marginLeft: "1.5em", marginBottom: "2em" }}
          variant="contained"
          color="primary"
          endIcon={<Icon>file_upload</Icon>}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default UploadMultimediaForm;
