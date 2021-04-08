import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    "& div": {
      border: "1px solid black",
    },
  },
}));

function VideoPlayer({ thumbnailSrc, videoSrc }) {
  const classes = useStyles();
  return <div className={classes.root}> Video Player</div>;
}

export default VideoPlayer;
