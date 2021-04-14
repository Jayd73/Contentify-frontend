import React from "react";
import { useState, useEffect } from "react";
import { useUserState } from "../../contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import axiosInstance from "../../axios";

import Card from "@material-ui/core/Card";

import SectionTitle from "../customizedComponents/SectionTitle";
import { abbreviateNumber } from "../miscellaneous/HelperFunctions";
import UserDataTable from "./UserDataTable";

let dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  analyticsContainer: {
    margin: 0,
    marginTop: "0.4em",
    marginInline: "0.5em",
    width: "69.55em",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: window.innerHeight - 145,
    // border: "2px solid blue",
  },
  followerCard: {
    // maxWidth: "fit-content",
    margin: "0.3em",
    display: "flex",
    alignItems: "center",
    paddingInline: "1em",
    flexGrow: 1,
  },
  followIconStyle: {
    fontSize: "6em",
    margin: "0.15em",
    marginRight: "0.2em",
    color: theme.palette.primary.main,
  },
  followerCount: {
    fontSize: "3em",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  basicContainer: {
    display: "flex",
    width: "100%",
  },
  tableTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    color: theme.palette.appBg.darkest,
    margin: "0.6em",
  },
}));

function UserAnalytics() {
  const classes = useStyles();
  const [userState, setUserState] = useUserState();

  const [followerData, setFollowerData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [userPostData, setUserPostData] = useState(null);

  const [videoComnts, setVideoComnts] = useState(null);
  const [audioComnts, setAudioComnts] = useState(null);
  const [userPostComnts, setUserPostComnts] = useState(null);

  // const [totVideoCmnts, setTotVideoComnts] = useState(null);
  // const [totAudioCmnts, setTotAudioComnts] = useState(null);
  // const [userPostTableData, setUserPostTableData] = useState([]);

  const maxSnippetChar = 40;

  useEffect(() => {
    axiosInstance
      .get(`channel/followers/${userState.moreChannelData.id}/`)
      .then((res) => {
        setFollowerData(res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    // getting video data
    axiosInstance
      .get(`video/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setVideoData(res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    axiosInstance
      .get(`comment/video/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setVideoComnts(res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    // getting video data
    axiosInstance
      .get(`audio/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setAudioData(res.data);
        // console.log("audio data got: ", res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    axiosInstance
      .get(`comment/audio/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setAudioComnts(res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    // getting userPost data
    axiosInstance
      .get(`userpost/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setUserPostData(res.data);
        // console.log("post data got: ", res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });

    axiosInstance
      .get(`comment/userpost/channel/${userState.moreChannelData.id}/`)
      .then((res) => {
        setUserPostComnts(res.data);
      })
      .catch((err) => {
        console.log("Error while getting data: ", err);
      });
  }, []);

  function getNewFollowersIn(lastDays) {
    var d = new Date();
    d.setDate(d.getDate() - lastDays);
    const followersInLastDays = followerData.filter((follower) =>
      dayjs(follower.follow_date).isAfter(d)
    );
    // console.log("Followers in last days: ", followersInLastDays);
    return abbreviateNumber(followersInLastDays.length);
  }

  function getTotalLikes() {
    let total_likes = 0;
    for (let video in videoData) {
      total_likes += videoData[video].likes;
      // console.log("vid: ", video);
    }

    for (let audio in audioData) {
      total_likes += audioData[audio].likes;
    }

    return abbreviateNumber(total_likes);
  }

  function getTotalPlays() {
    let totalPlays = 0;
    for (let video in videoData) {
      totalPlays += videoData[video].plays;
    }

    for (let audio in audioData) {
      totalPlays += audioData[audio].plays;
    }

    return abbreviateNumber(totalPlays);
  }

  const userPostTableHead = {
    title: "Snippet",
    uploadDate: "Upload Date",
    likes: "Likes",
  };

  const videoTableHead = {
    title: "Title",
    views: "Views",
    uploadDate: "Upload Date",
    likes: "Likes",
  };

  const audioTableHead = {
    title: "Title",
    creator: "Subheader",
    listens: "Listens",
    uploadDate: "Upload Date",
    likes: "Likes",
  };

  function getUserPostTableData() {
    let userPostTableData = [];
    let snippet = "No text in this post";
    for (let userPostKey in userPostData) {
      let userPost = userPostData[userPostKey];
      if (userPost.content) {
        snippet =
          userPost.content.length > maxSnippetChar
            ? userPost.content.substring(0, maxSnippetChar) + "..."
            : userPost.content;
      }
      let postTime = dayjs(userPost.published).format("hh:mm a, MMM DD, YY");

      userPostTableData.push({
        snippet,
        postTime,
        totLikes: abbreviateNumber(userPost.likes),
      });
    }

    return userPostTableData;
  }

  function getVideoTableData() {
    let videoTableData = [];
    let snippet;
    for (let videoKey in videoData) {
      let video = videoData[videoKey];
      snippet =
        video.title.length > maxSnippetChar
          ? video.title.substring(0, maxSnippetChar) + "..."
          : video.title;

      let postTime = dayjs(video.upload_date).format("MMM DD, YYYY");

      videoTableData.push({
        snippet,
        views: video.plays,
        postTime,
        totLikes: abbreviateNumber(video.likes),
      });
    }

    return videoTableData;
  }

  function getAudioTableData() {
    let audioTableData = [];
    let snippet, subheaderSnippet;
    for (let audioKey in audioData) {
      let audio = audioData[audioKey];
      snippet =
        audio.title.length > maxSnippetChar
          ? audio.title.substring(0, maxSnippetChar) + "..."
          : audio.title;

      subheaderSnippet =
        audio.subheader.length > maxSnippetChar
          ? audio.subheader.substring(0, maxSnippetChar) + "..."
          : audio.subheader;

      let postTime = dayjs(audio.upload_date).format("MMM DD, YYYY");

      audioTableData.push({
        snippet,
        creator: subheaderSnippet,
        listens: audio.plays,
        postTime,
        totLikes: abbreviateNumber(audio.likes),
      });
    }

    return audioTableData;
  }

  return (
    <div>
      <SectionTitle title={"Analytics 📈"} noButton={true} />
      <div className={classes.analyticsContainer}>
        {followerData != null &&
        videoData != null &&
        audioData != null &&
        userPostData != null &&
        videoComnts != null &&
        audioComnts != null &&
        userPostComnts != null ? (
          <>
            <div className={classes.basicContainer}>
              <Card className={classes.followerCard}>
                <Icon className={classes.followIconStyle}>person_add</Icon>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Followers
                  </Typography>
                  <Typography className={classes.followerCount}>
                    {followerData.length}
                  </Typography>
                </div>
              </Card>
              <Card className={classes.followerCard}>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Last 24 hours
                  </Typography>
                  <Typography
                    className={classes.followerCount}
                    style={{ color: "green" }}
                  >
                    +{getNewFollowersIn(1)}
                  </Typography>
                </div>
              </Card>
              <Card className={classes.followerCard}>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Last 28 days
                  </Typography>
                  <Typography
                    className={classes.followerCount}
                    style={{ color: "green" }}
                  >
                    +{getNewFollowersIn(28)}
                  </Typography>
                </div>
              </Card>
            </div>
            <div className={classes.basicContainer}>
              <Card className={classes.followerCard}>
                <Icon className={classes.followIconStyle}>play_arrow</Icon>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Total plays
                  </Typography>
                  <Typography className={classes.followerCount}>
                    {getTotalPlays()}
                  </Typography>
                </div>
              </Card>
              <Card className={classes.followerCard}>
                <Icon
                  className={classes.followIconStyle}
                  style={{ fontSize: "4.2em", margin: "0.4em" }}
                >
                  thumb_up
                </Icon>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Total likes
                  </Typography>
                  <Typography className={classes.followerCount}>
                    {getTotalLikes()}
                  </Typography>
                </div>
              </Card>
              <Card className={classes.followerCard}>
                <Icon
                  className={classes.followIconStyle}
                  style={{ fontSize: "4.2em", margin: "0.4em" }}
                >
                  chat
                </Icon>
                <div>
                  <Typography
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginBottom: "-0.6em",
                    }}
                  >
                    Total comments
                  </Typography>
                  <Typography className={classes.followerCount}>
                    {abbreviateNumber(
                      videoComnts.length +
                        audioComnts.length +
                        userPostComnts.length
                    )}
                  </Typography>
                </div>
              </Card>
            </div>
            {userPostData.length > 0 ? (
              <>
                <Typography className={classes.tableTitle}>Posts</Typography>
                <UserDataTable
                  headingRow={userPostTableHead}
                  rows={getUserPostTableData()}
                />
              </>
            ) : (
              <Typography className={classes.tableTitle}>
                No posts uploaded
              </Typography>
            )}

            {videoData.length > 0 ? (
              <>
                <Typography className={classes.tableTitle}>Videos</Typography>
                <UserDataTable
                  headingRow={videoTableHead}
                  rows={getVideoTableData()}
                />
              </>
            ) : (
              <Typography className={classes.tableTitle}>
                No videos uploaded
              </Typography>
            )}

            {audioData.length > 0 ? (
              <>
                <Typography className={classes.tableTitle}>Audios</Typography>
                <UserDataTable
                  headingRow={audioTableHead}
                  rows={getAudioTableData()}
                />
              </>
            ) : (
              <Typography className={classes.tableTitle}>
                No audios uploaded
              </Typography>
            )}
          </>
        ) : (
          "Fetching data"
        )}
      </div>
    </div>
  );
}

export default UserAnalytics;
