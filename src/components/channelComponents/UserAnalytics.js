import React from "react";
import { useState, useEffect } from "react";
import { useUserState } from "../../contexts/UserContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import axiosInstance from "../../axios";

import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import { Icon, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";

import SectionTitle from "../customizedComponents/SectionTitle";
import { abbreviateNumber } from "../miscellaneous/HelperFunctions";
import UserDataTable from "./UserDataTable";

import CircularProgress from "@material-ui/core/CircularProgress";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

let dayjs = require("dayjs");
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const containerHt = window.innerHeight - 145;
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
    minHeight: containerHt,
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
    fontSize: "5.5em",
    margin: "0.15em",
    marginRight: "0.2em",
    color: theme.palette.primary.main,
  },
  followerCount: {
    fontSize: "2.5em",
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
    margin: "0.8em",
  },
  progressContainer: {
    width: "100%",
    height: containerHt,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  smallCardIconStyle: {
    fontSize: "2em",
    margin: "0.2em",
    marginRight: "0.4em",
    color: theme.palette.appBg.silver,
  },
  smallCardNum: {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginInline: "0.5em",
  },
  chartsContainer: {
    display: "flex",
    width: "100%",
    height: "24em",
    margin: "0.3em",
    // border: "1px solid blue",
  },
  chartCardStyle: {
    flexGrow: 1,
    position: "relative",
    height: "100%",
    maxHeight: "fit-content",
    padding: "0.7em",
    paddingBottom: "3.8em",
    margin: "0.3em",
  },
}));

function SmallDataCard({ iconName, label, numData }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.followerCard}
      style={{
        alignItems: "center",
        marginBottom: "1em",
        padding: "0.7em",
        marginTop: "-0.5em",
      }}
    >
      <Icon
        className={classes.smallCardIconStyle}
        // style={{ fontSize: "4.2em", margin: "0.4em" }}
      >
        {iconName}
      </Icon>
      <Typography
        style={{
          fontSize: "1.3em",
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
      <div style={{ flexGrow: 1 }} />
      <Typography className={classes.smallCardNum}>
        {abbreviateNumber(numData)}
      </Typography>
    </Card>
  );
}

function LineChartCard({ chartData, title, setLastDays }) {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDayOptClose = () => {
    setAnchorEl(null);
  };

  const popoverActions = [
    {
      name: "Last 7 days",
      onClick: () => {
        setLastDays(7);
        handleDayOptClose();
      },
    },
    {
      name: "Last 28 days",
      onClick: () => {
        setLastDays(28);
        handleDayOptClose();
      },
    },
    {
      name: "Last 360 days",
      onClick: () => {
        setLastDays(360);
        handleDayOptClose();
      },
    },
  ];

  return (
    <Card className={classes.chartCardStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            fontSize: "1.3em",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreVertIcon />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {popoverActions.map((item) => (
            <ListItem
              button
              key={item.name}
              onClick={item.onClick}
              style={{ height: "2.7em" }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </Popover>
      </div>

      <div style={{ position: "relative", height: "100%", flexGrow: 1 }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // fontSize: 12,
                    fontFamily: theme.typography.fontFamily,
                    callback: function (value, index, values) {
                      return abbreviateNumber(value);
                    },
                    beginAtZero: true,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontSize: 12,
                    fontFamily: theme.typography.fontFamily,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
            legend: {
              display: true,
              labels: {
                fontSize: 14,
                fontFamily: theme.typography.fontFamily,
              },
            },
          }}
        />
      </div>
    </Card>
  );
}

function DoughnutChartCard({ chartData, title, chartWidth }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card className={classes.chartCardStyle} style={{ width: chartWidth }}>
      <Typography
        style={{
          fontSize: "1.3em",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

      <div style={{ position: "relative", height: "100%", flexGrow: 1 }}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            legend: {
              display: true,
              labels: {
                fontSize: 14,
                fontFamily: theme.typography.fontFamily,
              },
            },
          }}
        />
      </div>
    </Card>
  );
}

function UserAnalytics() {
  const classes = useStyles();
  const theme = useTheme();

  const maxSnippetChar = 40;
  const [userState, setUserState] = useUserState();

  const [followerData, setFollowerData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [userPostData, setUserPostData] = useState(null);

  const [videoComnts, setVideoComnts] = useState(null);
  const [audioComnts, setAudioComnts] = useState(null);
  const [userPostComnts, setUserPostComnts] = useState(null);

  const [followersChartData, setFollowersChartData] = useState({});
  const [channelLikesData, setChannelLikesData] = useState({});
  const [channelComntsData, setChannelComntsData] = useState({});
  const [uploadFreqData, setUploadFreqData] = useState({});

  const [lastDays, setLastDays] = useState(7);
  const [uploadLastDays, setUploadLastDays] = useState(7);
  const chartTriColor = [
    theme.palette.primary.main,
    "rgb(255, 205, 86)",
    theme.palette.secondary.main,
  ];

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

    // followerChart();
    // likesDoughnutChart();
  }, []);

  useEffect(() => {
    if (followerData) {
      setfollowerDataIn(lastDays);
    }
  }, [followerData, lastDays]);

  useEffect(() => {
    if (videoData && audioData && userPostData) {
      setLikesChartData();
      setUploadFreqChartData(uploadLastDays);
    }
  }, [videoData, audioData, userPostData, uploadLastDays]);

  useEffect(() => {
    if (videoComnts && audioComnts && userPostComnts) {
      setCommentsChartData();
    }
  }, [videoComnts, audioComnts, userPostComnts]);

  function getNewFollowersIn(lastDays) {
    var d = new Date();
    d.setDate(d.getDate() - lastDays);
    const followersInLastDays = followerData.filter((follower) =>
      dayjs(follower.follow_date).isAfter(d)
    );
    // console.log("Followers in last days: ", followersInLastDays);
    return abbreviateNumber(followersInLastDays.length);
  }

  function setfollowerDataIn(lastDays) {
    const xAxisPts = { 7: 7, 28: 7, 360: 12 };
    let date = new Date();
    let thatDayFollowers = 0;
    let dayWiseFollowers = [],
      xAxisData = [];

    for (let i = 0; i < xAxisPts[lastDays]; i++) {
      thatDayFollowers = followerData.filter((follower) =>
        dayjs(follower.follow_date).isSameOrBefore(date, "day")
      ).length;
      dayWiseFollowers.splice(0, 0, thatDayFollowers);
      xAxisData.splice(0, 0, dayjs(date).format("DD MMM, YY"));
      date.setDate(date.getDate() - lastDays / xAxisPts[lastDays]);
    }
    setFollowersChartData({
      labels: xAxisData,
      datasets: [
        {
          label: "Followers",
          data: dayWiseFollowers,
          backgroundColor: [fade(theme.palette.primary.main, 0.5)],
          borderWidth: 4,
          borderColor: theme.palette.primary.main,
        },
      ],
    });
  }

  const setLikesChartData = () => {
    let videoLikes = 0,
      audioLikes = 0,
      postsLikes = 0;
    for (let i in videoData) {
      videoLikes += videoData[i].likes;
    }
    for (let i in audioData) {
      audioLikes += audioData[i].likes;
    }
    for (let i in userPostData) {
      postsLikes += userPostData[i].likes;
    }

    setChannelLikesData({
      labels: ["Videos", "Audios", "Posts"],
      datasets: [
        {
          label: "Overall likes",
          data: [videoLikes, audioLikes, postsLikes],
          backgroundColor: chartTriColor,
          hoverOffset: 4,
          hoverBorderColor: chartTriColor,
          hoverBorderWidth: 3,
        },
      ],
    });
  };

  function setCommentsChartData() {
    setChannelComntsData({
      labels: ["Videos", "Audios", "Posts"],
      datasets: [
        {
          label: "Overall Comments",
          data: [videoComnts.length, audioComnts.length, userPostComnts.length],
          backgroundColor: chartTriColor,
          hoverOffset: 4,
          hoverBorderColor: chartTriColor,
          hoverBorderWidth: 3,
        },
      ],
    });
  }

  function setUploadFreqChartData(uploadLastDays) {
    let date = new Date();
    let thatDayUploads = 0;
    let uploadFreq = [[], [], []];
    let xAxisData = [],
      allData = [videoData, audioData, userPostData];
    let dateKeys = ["upload_date", "upload_date", "published"];

    for (let i = 0; i < uploadLastDays; i++) {
      for (let j = 0; j < 3; j++) {
        let mediaDataArr = allData[j];
        thatDayUploads = mediaDataArr.filter((media) =>
          dayjs(media[dateKeys[j]]).isSame(date, "day")
        ).length;
        uploadFreq[j].splice(0, 0, thatDayUploads);
      }
      xAxisData.splice(0, 0, dayjs(date).format("DD MMM, YY"));
      date.setDate(date.getDate() - 1);
    }

    console.log("video: ", videoData);
    console.log("video freq\n: ", uploadFreq[0]);

    setUploadFreqData({
      labels: xAxisData,
      datasets: [
        {
          label: "Videos",
          data: uploadFreq[0],
          // backgroundColor: [fade(chartTriColor[0], 0.5)],
          borderWidth: 4,
          borderColor: chartTriColor[0],
        },
        {
          label: "Audios",
          data: uploadFreq[1],
          // backgroundColor: [fade(chartTriColor[0], 0.5)],
          borderWidth: 4,
          borderColor: chartTriColor[1],
        },
        {
          label: "Posts",
          data: uploadFreq[2],
          // backgroundColor: [fade(chartTriColor[0], 0.5)],
          borderWidth: 4,
          borderColor: chartTriColor[2],
        },
      ],
    });
  }

  function getTotalLikes() {
    let total_likes = 0;
    for (let userPost in userPostData) {
      total_likes += userPostData[userPost].likes;
    }

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
    comments: "Comments",
  };

  const videoTableHead = {
    title: "Title",
    uploadDate: "Upload Date",
    views: "Views",
    likes: "Likes",
    comments: "Comments",
  };

  const audioTableHead = {
    title: "Title",
    creator: "Subheader",
    uploadDate: "Upload Date",
    listens: "Listens",
    likes: "Likes",
    comments: "Comments",
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
        comments: abbreviateNumber(
          userPostComnts.filter((cmnt) => cmnt.userPost_ref.id == userPost.id)
            .length
        ),
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
        postTime,
        views: abbreviateNumber(video.plays),
        totLikes: abbreviateNumber(video.likes),
        comments: abbreviateNumber(
          videoComnts.filter((cmnt) => cmnt.video_ref.id == video.id).length
        ),
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
        postTime,
        listens: abbreviateNumber(audio.plays),
        totLikes: abbreviateNumber(audio.likes),
        comments: abbreviateNumber(
          audioComnts.filter((cmnt) => cmnt.audio_ref.id == audio.id).length
        ),
      });
    }

    return audioTableData;
  }

  function getAvgOf(mediaData, keyAttribute) {
    let total = 0;
    for (let media in mediaData) {
      total += mediaData[media][keyAttribute];
    }
    return total / mediaData.length;
  }

  function getAvgComments(mediaData, commentData, keyAttribute) {
    let total = 0;
    for (let media in mediaData) {
      total += commentData.filter(
        (cmnt) => cmnt[keyAttribute].id == mediaData[media].id
      ).length;
    }
    return total / mediaData.length;
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
                    {userState.moreChannelData.followers}
                    {/* {followerData.length} */}
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

            <div className={classes.chartsContainer}>
              <LineChartCard
                title={"Followers"}
                chartData={followersChartData}
                setLastDays={setLastDays}
              />

              <DoughnutChartCard
                title={"Overall Likes"}
                chartData={channelLikesData}
                chartWidth={"21em"}
              />
            </div>
            <div className={classes.chartsContainer}>
              <DoughnutChartCard
                title={"Overall Comments"}
                chartData={channelComntsData}
                chartWidth={"21em"}
              />
              <LineChartCard
                title={"Upload frequency"}
                chartData={uploadFreqData}
                setLastDays={setUploadLastDays}
              />
            </div>

            {userPostData.length > 0 ? (
              <>
                <UserDataTable
                  title={"Posts"}
                  totString={`${abbreviateNumber(userPostData.length)} ${
                    userPostData.length == 1 ? "post" : "posts"
                  }`}
                  headingRow={userPostTableHead}
                  rows={getUserPostTableData()}
                />
                <div style={{ display: "flex", width: "100%" }}>
                  <SmallDataCard
                    iconName={"thumb_up"}
                    label={"Avg. likes per post: "}
                    numData={getAvgOf(userPostData, "likes")}
                  />
                  <SmallDataCard
                    iconName={"chat"}
                    label={"Avg. comments per post: "}
                    numData={getAvgComments(
                      userPostData,
                      userPostComnts,
                      "userPost_ref"
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {videoData.length > 0 ? (
              <>
                <UserDataTable
                  title={"Videos"}
                  totString={`${abbreviateNumber(videoData.length)} ${
                    videoData.length == 1 ? "video" : "videos"
                  }`}
                  headingRow={videoTableHead}
                  rows={getVideoTableData()}
                />
                <div style={{ display: "flex", width: "100%" }}>
                  <SmallDataCard
                    iconName={"play_arrow"}
                    label={"Avg. views per video: "}
                    numData={getAvgOf(videoData, "plays")}
                  />
                  <SmallDataCard
                    iconName={"thumb_up"}
                    label={"Avg. likes per video: "}
                    numData={getAvgOf(videoData, "likes")}
                  />
                  <SmallDataCard
                    iconName={"chat"}
                    label={"Avg. comments per video: "}
                    numData={getAvgComments(
                      videoData,
                      videoComnts,
                      "video_ref"
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {audioData.length > 0 ? (
              <>
                <UserDataTable
                  title={"Audios"}
                  totString={`${abbreviateNumber(audioData.length)} ${
                    audioData.length == 1 ? "audio" : "audios"
                  }`}
                  headingRow={audioTableHead}
                  rows={getAudioTableData()}
                />
                <div style={{ display: "flex", width: "100%" }}>
                  <SmallDataCard
                    iconName={"play_arrow"}
                    label={"Avg. listens per audio: "}
                    numData={getAvgOf(audioData, "plays")}
                  />
                  <SmallDataCard
                    iconName={"thumb_up"}
                    label={"Avg. likes per audio: "}
                    numData={getAvgOf(audioData, "likes")}
                  />
                  <SmallDataCard
                    iconName={"chat"}
                    label={"Avg. comments per audio: "}
                    numData={getAvgComments(
                      audioData,
                      audioComnts,
                      "audio_ref"
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className={classes.progressContainer}>
            <CircularProgress size="7em" thickness={4} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAnalytics;
