import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import axiosInstance from "../../axios";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { shuffleArr, abbreviateNumber } from "../miscellaneous/HelperFunctions";

import VideoContainer from "../mainContainer/VideoContainer";
import AudioContainer from "../mainContainer/AudioContainer";
import CommentContainer from "../mainContainer/CommentContainer";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ShareIcon from "@material-ui/icons/Share";

import ShareLinkDialog from "../customizedComponents/ShareLinkDialog";
import CustomVideoPlayer from "../players/CustomVideoPlayer";
import CustomAudioPlayer from "../players/CustomAudioPlayer";

import CircularProgress from "@material-ui/core/CircularProgress";

let dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& div": {
      // border: "1px solid black",
    },
  },
  leftBox: {
    flexGrow: 1,
    marginInline: "0.5em",
  },
  rightBox: {
    objectFit: "contain",
  },
  playerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // paddingTop: "56.25%",
  },

  headingText: {
    fontSize: "1.5em",
    fontWeight: "bold",
    wordWrap: "break-word",
    backgroundColor: theme.palette.appBg.dark,
    padding: "0.3em 0.7em",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
  subheader: {
    fontSize: "0.7em",
    color: theme.palette.appBg.darkest,
    marginTop: "0.3em",
  },
  mediaDetailsAndAction: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.appBg.dark,
    paddingInline: "1em",
  },
  details: {
    fontSize: "1.1em",
    color: theme.palette.appBg.darkest,
  },

  actionBtnDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5em 0em",
  },
  actionBtn: {
    paddingInline: "1.5em",
    marginInline: "0.5em",
    height: "3em",
  },

  avatarAndFollow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0.5em 0em",
    backgroundColor: theme.palette.appBg.darker,
    paddingInline: "1em",
  },
  channelName: {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    paddingInline: "0.5em",
  },
  followers: {
    fontSize: "1em",
    color: theme.palette.appBg.darkest,
    fontWeight: "bolder",
    paddingInline: "0.65em",
  },
  mainAvatar: {
    height: "2.7em",
    width: "2.7em",
  },
  description: {
    padding: "1em",
    backgroundColor: theme.palette.appBg.dark,
  },
  progressContainer: {
    width: "100%",
    height: window.innerHeight - 130,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function PlayingInterface() {
  const classes = useStyles();
  const history = useHistory();
  const { channelSlug, mediaType, mediaSlug } = useParams();

  const [allMedia, setAllMedia] = useState([]);
  const [mediaData, setMediaData] = useState();
  const [details, setDetais] = useState("");
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [isFollowing, setisFollowing] = React.useState(false);
  const [followers, setFollowers] = React.useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`${mediaType}/`)
      .then((res) => {
        res.data = res.data.filter((mediaObj) => mediaObj.slug != mediaSlug);
        shuffleArr(res.data);
        setAllMedia(res.data);
      })
      .catch((err) => {
        console.log("Error from API: ", err);
      });

    axiosInstance
      .get(`${mediaType}/${mediaSlug}/`)
      .then((res) => {
        setMediaData(res.data);
        setDetais(
          `${abbreviateNumber(res.data.plays + 1)} ${
            res.data.plays + 1 == 1
              ? mediaType === "video"
                ? "view"
                : "listen"
              : mediaType === "video"
              ? "views"
              : "listens"
          } | ${dayjs(res.data.upload_date).format("MMM DD, YYYY")}`
        );
        setLikes(res.data.likes);
        setFollowers(res.data.channel.followers);
      })
      .catch((err) => {
        console.log("Error from API: ", err);
      });

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (mediaData) {
      let mediaFormData = new FormData();
      mediaFormData.append("plays", mediaData.plays + 1);
      axiosInstance
        .patch(`${mediaType}/edit/${mediaData.id}/`, mediaFormData)
        .catch((err) => {
          console.log("Error from API: ", err);
        });
      window.scrollTo(0, 0);
    }
  }, [mediaData]);

  const toggleLike = () => {
    setLiked(!liked);
    if (liked) {
      // Doing the opposite bcoz useState has not updated the values yet
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };

  const toggleFollow = () => {
    setisFollowing(!isFollowing);
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
  };

  const handleShare = () => {
    setAnchorEl(null);
    setOpenShareDialog(true);
  };

  const playNextAudio = () => {
    history.push(
      `/channel/${allMedia[0].channel.slug}/audio/${allMedia[0].slug}`
    );
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      {mediaData ? (
        <>
          <div className={classes.leftBox}>
            <div className={classes.playerContainer}>
              {mediaData ? (
                mediaType === "video" ? (
                  <CustomVideoPlayer
                    thumbnailSrc={mediaData.thumbnail}
                    videoSrc={mediaData.file}
                  />
                ) : (
                  <CustomAudioPlayer
                    coverSrc={mediaData.cover}
                    audioSrc={mediaData.file}
                    name={mediaData.title}
                    subheader={mediaData.subheader}
                    playNext={playNextAudio}
                  />
                )
              ) : (
                ""
              )}
            </div>
            <Typography className={classes.headingText}>
              {mediaData && mediaData.title}
              {mediaData && mediaData.subheader ? (
                <Typography className={classes.subheader}>
                  {mediaData.subheader}
                </Typography>
              ) : (
                ""
              )}
            </Typography>

            <div className={classes.mediaDetailsAndAction}>
              <Typography className={classes.details}>{details}</Typography>
              <div style={{ flexGrow: 1 }}></div>
              <div className={classes.actionBtnDiv}>
                <Button
                  className={classes.actionBtn}
                  variant="contained"
                  color="primary"
                  startIcon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  onClick={toggleLike}
                >
                  Like {abbreviateNumber(likes)}
                </Button>
                <Button
                  className={classes.actionBtn}
                  variant="contained"
                  color="primary"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
                <ShareLinkDialog
                  open={openShareDialog}
                  setOpen={setOpenShareDialog}
                  linkAddress={`${window.location.host}/channel/${channelSlug}/${mediaType}/${mediaSlug}`}
                />
              </div>
            </div>
            <div className={classes.avatarAndFollow}>
              <Avatar
                className={classes.mainAvatar}
                src={mediaData && mediaData.channel.avatar}
                onClick={() =>
                  history.push(`/channel/${mediaData.channel.slug}`)
                }
              />
              <div>
                <Typography className={classes.channelName}>
                  {mediaData && mediaData.channel.user.username}
                </Typography>
                <Typography className={classes.followers}>
                  {abbreviateNumber(followers)}{" "}
                  {followers == 1 ? "follower" : "followers"}
                </Typography>
              </div>

              <div style={{ flexGrow: 1 }}></div>
              <Button
                className={classes.actionBtn}
                variant="contained"
                color={isFollowing ? "secondary" : "primary"}
                onClick={toggleFollow}
              >
                {isFollowing ? "Followed" : "Follow"}
              </Button>
            </div>
            <div className={classes.description}>
              <Typography
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.2em",
                  marginBottom: "1em",
                }}
              >
                Description
              </Typography>
              <Typography component="pre" style={{ whiteSpace: "pre-wrap" }}>
                {mediaData && mediaData.description}
              </Typography>
            </div>
            {mediaData && (
              <div
                style={{
                  padding: "1em",
                  paddingInline: "1em",
                  objectFit: "contain",
                }}
              >
                <CommentContainer
                  commentOn={mediaType}
                  componentID={mediaData.id}
                />
              </div>
            )}
          </div>
          <div className={classes.rightBox}>
            {mediaType === "video" ? (
              <VideoContainer
                allVideos={allMedia}
                gridDirection="column"
                cardWidth={400}
                reloadReq={true}
              />
            ) : (
              <AudioContainer
                allAudios={allMedia}
                gridDirection="column"
                cardWidth={380}
                reloadReq={true}
              />
            )}
          </div>
        </>
      ) : (
        <div className={classes.progressContainer}>
          <CircularProgress size="7em" thickness={4} />
        </div>
      )}
    </div>
  );
}

export default PlayingInterface;
