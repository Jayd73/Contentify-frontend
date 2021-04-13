import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

import VideoContainer from "../mainContainer/VideoContainer";
import PostContainer from "../mainContainer/PostContainer";
import AudioContainer from "../mainContainer/AudioContainer";
import ChannelCard from "../cards/ChannelCard";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alignStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  followingContainer: {
    margin: "0.5em",
    minHeight: window.innerHeight - 145,
    overflowY: "auto",
    maxHeight: "fit-content",
    width: "85%",
    // border: "2px solid blue",
  },
}));

function SearchHandler() {
  const { filterValue } = useParams();
  const [searchRes, setSearchRes] = useState();
  const [userState, setUserState] = useUserState();

  const classes = useStyles();

  useEffect(() => {
    axiosInstance
      .get(`search/${filterValue}/` + window.location.search)
      .then((res) => {
        setSearchRes(res.data);
        console.log("search:\n", res.data);
      })
      .catch((err) => console.log("Err while searching: ", err));
  }, []);

  return (
    <div>
      {searchRes ? (
        filterValue == "video" ? (
          <VideoContainer
            allVideos={searchRes}
            variant={"horizontal"}
            gridDirection="column"
          />
        ) : filterValue == "audio" ? (
          <AudioContainer allAudios={searchRes} />
        ) : filterValue == "userpost" ? (
          <PostContainer userPosts={searchRes} />
        ) : filterValue == "channel" ? (
          <div className={classes.alignStyle}>
            <div className={classes.followingContainer}>
              {searchRes.map((channel) => (
                <ChannelCard
                  channelData={channel}
                  key={channel.id}
                  showAbout={true}
                  isUserFollowing={userState.moreChannelData.followedChannels.some(
                    (fc) => fc.id === channel.id
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        <Typography
          style={{
            fontSize: "2.5em",
            fontWeight: "bold",
            opacity: 0.6,
            margin: "5em",
            textAlign: "center",
          }}
        >
          {/* No results found */}
        </Typography>
      )}
    </div>
  );
}

export default SearchHandler;
