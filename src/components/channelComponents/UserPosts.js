import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import CreatePostForm from "./CreatePostForm";
import { Create } from "@material-ui/icons";
import PostContainer from "../mainContainer/PostContainer";
import axiosInstance from "../../axios";
import { useUserState } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.secondary.dark,
    position: "sticky",
    top: theme.mixins.toolbar.minHeight,
    fontSize: "1em",
    fontWeight: "bold",
    padding: "1em",
    paddingLeft: "2em",
    borderTop: `2px solid ${theme.palette.appBg.darkest}`,
    borderBottom: `2px solid ${theme.palette.appBg.darkest}`,
    backgroundColor: theme.palette.appBg.darker,
  },
  postsContainer: {
    margin: 0,
    marginTop: "1.5em",
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

function UserPosts({ editable }) {
  const theme = useTheme();
  const classes = useStyles();
  const [userState, setUserState] = useUserState();
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    userPosts: null,
  });

  const headingRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(
      0,
      headingRef.current.getBoundingClientRect().top -
        theme.mixins.toolbar.minHeight
    );
  }, []);

  useEffect(() => {
    if (userState.moreChannelData.id) {
      axiosInstance
        .get(`userpost/channel/${userState.moreChannelData.id}/`)
        .then((res) => {
          const allPosts = res.data;
          setAppState({ loading: false, userPosts: allPosts });
          // console.log("Got posts data: ", res.data);
        })
        .catch((err) => {
          console.log("Error from API: ", err);
        });
    }
  }, [setAppState]);

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
      <div ref={headingRef} className={classes.heading}>
        <h1>Posts 📃 </h1>
        {editable ? (
          <Button
            style={{ height: "3em", marginRight: "2em" }}
            variant="contained"
            color="primary"
            endIcon={<Create />}
            disabled={showCreatePostForm}
            onClick={() => setShowCreatePostForm(true)}
          >
            Create new
          </Button>
        ) : (
          ""
        )}
      </div>
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
