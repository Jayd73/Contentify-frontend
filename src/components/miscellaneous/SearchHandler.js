import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";

import VideoContainer from "../mainContainer/VideoContainer";
import PostContainer from "../mainContainer/PostContainer";
import AudioContainer from "../mainContainer/AudioContainer";
import { Typography } from "@material-ui/core";

function SearchHandler() {
  const { filterValue } = useParams();
  const [searchRes, setSearchRes] = useState();

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
          No results found
        </Typography>
      )}
    </div>
  );
}

export default SearchHandler;
