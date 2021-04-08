import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";
import AudioPlayer from "material-ui-audio-player";

const cardWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "22em",
    display: "flex",
    border: "1px solid black",
    // "& div": {
    //   border: "1px solid black",
    // },
  },
  coverContainer: {
    height: "100%",
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  coverCardStyle: {
    width: cardWidth,
    height: cardWidth * 1.15,
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
  coverStyle: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  controlsContainer: {
    height: "100%",
    flexGrow: 1,
  },
}));

function CustomAudioPlayer({ coverSrc, audioSrc }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.coverContainer}>
        <Card className={classes.coverCardStyle}>
          <CardMedia
            className={classes.coverStyle}
            component="img"
            image={coverSrc}
          />
        </Card>
      </div>
      <div className={classes.controlsContainer}>
        <AudioPlayer
          src={audioSrc}
          elevation={1}
          width="100%"
          variation="default"
          spacing={3}
          order="standart"
          preload="auto"
        />
      </div>
    </div>
  );
}

export default CustomAudioPlayer;
