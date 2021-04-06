import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CreatePostForm from "./CreatePostForm";
import { Create } from "@material-ui/icons";
import PostContainer from "../mainContainer/PostContainer";
import axiosInstance from "../../axios";

import SectionTitle from "../customizedComponents/SectionTitle";

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    margin: 0,
    marginTop: "1em",
    height: window.innerHeight - 140,
    overflowY: "scroll",
    // border: "2px solid blue",
  },
  loadingStyle: {
    textAlign: "center",
    margin: "2em",
    color: theme.palette.secondary,
    fontWeight: "bold",
  },
}));

function UserPosts({ currChannelID, editable }) {
  const classes = useStyles();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    userPosts: null,
  });

  useEffect(() => {
    if (currChannelID) {
      axiosInstance
        .get(`userpost/channel/${currChannelID}/`)
        .then((res) => {
          const allPosts = res.data;
          setAppState({ loading: false, userPosts: allPosts });
          // console.log("Got posts data: ", res.data);
        })
        .catch((err) => {
          console.log("Error from API: ", err);
        });
    }
  }, [setAppState, currChannelID]);

  const showPosts = () =>
    appState.loading && showCreatePostForm ? (
      <Typography variant="h3" className={classes.loadingStyle}>
        Loading Posts...
      </Typography>
    ) : (
      <PostContainer userPosts={appState.userPosts} />
    );

  return (
    <div>
      <SectionTitle
        title={"Posts 📃"}
        btnText={"Create New"}
        EndIcon={Create}
        showCreatePostForm={showCreatePostForm}
        setShowCreatePostForm={setShowCreatePostForm}
        canEdit={editable}
      />

      <div className={classes.postsContainer}>
        {showCreatePostForm ? (
          <CreatePostForm setShowForm={setShowCreatePostForm} />
        ) : (
          showPosts()
        )}
      </div>
    </div>
  );
}

export default UserPosts;
