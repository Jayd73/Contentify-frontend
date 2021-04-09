import React, { useState, useRef, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

import { getTimeFromSecs } from "../miscellaneous/HelperFunctions";

const CustomSilder = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

const cardWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "22em",
    display: "flex",
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
  headingText: {
    fontSize: "1.6em",
    fontWeight: "bold",
    wordWrap: "break-word",
    // backgroundColor: theme.palette.appBg.dark,
    padding: "0.3em 0em",
  },
  subheader: {
    fontSize: "1em",
    color: theme.palette.appBg.darkest,
  },
  controlsContainer: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  controlWrapper: {
    width: "25em",
    height: "75%",
    wordWrap: "break-word",
    marginBottom: "2em",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ctrlBtn: {
    height: "2.5em",
    width: "2.5em",
    marginInline: "0.7em",
  },
  iconStyle: {
    fontSize: "2em",
  },
  timeDisplay: {
    display: "flex",
    width: "100%",
  },
  timeFont: {
    fontSize: "1em",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  centerBtn: {
    color: theme.palette.primary.main,
    fontSize: "3em",
  },
}));

function CustomAudioPlayer({ coverSrc, name, subheader, audioSrc, playNext }) {
  const classes = useStyles();
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const maxTitleLen = 58;
  const maxCreatorNameLen = 26;

  useEffect(() => {
    togglePlay();
  }, []);

  const handleChange = (e, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * newValue;
    setPercentage(newValue);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    audio.volume = 0.3;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const showCurrTime = (value) => {
    return getTimeFromSecs(currentTime);
  };

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
        <div className={classes.controlWrapper}>
          <Typography className={classes.headingText}>
            {name.length > maxTitleLen
              ? name.substring(0, maxTitleLen) + "..."
              : name}
          </Typography>
          <Typography className={classes.subheader}>{subheader}</Typography>
          <CustomSilder
            style={{ marginTop: "2.3em" }}
            value={percentage}
            valueLabelDisplay="auto"
            defaultValue={0}
            valueLabelFormat={(value) => (
              <Typography style={{ fontSize: "0.9em" }}>
                {showCurrTime(value)}
              </Typography>
            )}
            onChange={handleChange}
          />
          <audio
            ref={audioRef}
            onTimeUpdate={getCurrDuration}
            onLoadedData={(e) => {
              setDuration(e.currentTarget.duration.toFixed(2));
            }}
            src={audioSrc}
          ></audio>
          <div className={classes.timeDisplay}>
            <Typography className={classes.timeFont}>
              {getTimeFromSecs(currentTime)}
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Typography className={classes.timeFont}>
              {getTimeFromSecs(
                audioRef.current ? audioRef.current.duration : "00:00"
              )}
            </Typography>
          </div>
          <div className={classes.controls}>
            <IconButton className={classes.ctrlBtn}>
              <SkipPreviousIcon className={classes.iconStyle} />
            </IconButton>
            <IconButton
              className={classes.ctrlBtn}
              style={{ height: "3em", width: "3em" }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseCircleFilledIcon className={classes.centerBtn} />
              ) : (
                <PlayCircleFilledIcon className={classes.centerBtn} />
              )}
            </IconButton>
            <IconButton className={classes.ctrlBtn} onClick={() => playNext()}>
              <SkipNextIcon className={classes.iconStyle} />
            </IconButton>
          </div>
          {/* <VolumeSilder
            style={{ marginTop: "2.3em" }}
            valueLabelDisplay="auto"
            defaultValue={0}
            onChange={handleChange}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default CustomAudioPlayer;
