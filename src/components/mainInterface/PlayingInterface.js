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
import VideoPlayer from "../players/VideoPlayer";
import CustomAudioPlayer from "../players/CustomAudioPlayer";

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
    marginInline: "1em",
  },
  rightBox: {
    objectFit: "contain",
  },
  playerContainer: {
    width: "100%",
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
          `${abbreviateNumber(res.data.plays)} ${
            mediaType == "video" ? "views" : "listens"
          } | ${dayjs(res.data.upload_date).format("MMM DD, YYYY")}`
        );
        setLikes(res.data.likes);
        setFollowers(res.data.channel.followers);
      })
      .catch((err) => {
        console.log("Error from API: ", err);
      });
  }, []);

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

  return (
    <div className={classes.root}>
      <div className={classes.leftBox}>
        <div className={classes.playerContainer}>
          {mediaType === "video" ? (
            <VideoPlayer
              thumbnailSrc={mediaData && mediaData.thumbnail}
              videoSrc={mediaData && mediaData.file}
            />
          ) : (
            <CustomAudioPlayer
              coverSrc={mediaData && mediaData.cover}
              audioSrc={mediaData && mediaData.file}
            />
          )}
        </div>
        <Typography className={classes.headingText}>
          {mediaData && mediaData.title}
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
            onClick={() => history.push(`/channel/${mediaData.channel.slug}`)}
          />
          <div>
            <Typography className={classes.channelName}>
              {mediaData && mediaData.channel.user.username}
            </Typography>
            <Typography className={classes.followers}>
              {abbreviateNumber(followers)} followers
            </Typography>
          </div>

          <div style={{ flexGrow: 1 }}></div>
          <Button
            className={classes.actionBtn}
            variant="contained"
            color={isFollowing ? "secondary" : "primary"}
            onClick={toggleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
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
          <Typography component="pre">
            {mediaData && mediaData.description}
          </Typography>
        </div>
        {mediaData && (
          <div style={{ padding: "1em", paddingInline: "1em" }}>
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
          />
        ) : (
          <AudioContainer
            allAudios={allMedia}
            gridDirection="column"
            cardWidth={380}
          />
        )}
      </div>
    </div>
  );
}

export default PlayingInterface;
