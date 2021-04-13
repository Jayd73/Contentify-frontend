import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideoPlayer from "react-video-js-player";
import "./CustomVideoPlayer.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    // "& div": {
    //   border: "1px solid blue",
    // },
    margin: "0.1em",
    paddingLeft: "2.9em",
    backgroundColor: "black",
  },
}));

function CustomVideoPlayer({ thumbnailSrc, videoSrc }) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <VideoPlayer
        src={videoSrc}
        poster={thumbnailSrc}
        width="820"
        height="480"
        autoplay
        bigPlaybutton={false}
      />
    </div>
  );
}

export default CustomVideoPlayer;
