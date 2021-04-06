import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UploadMultimediaForm from "./UploadMultimediaForm";
import AddIcon from "@material-ui/icons/Add";
import VideoContainer from "../mainContainer/VideoContainer";
import axiosInstance from "../../axios";
import { useUserState } from "../../contexts/UserContext";
import SectionTitle from "../customizedComponents/SectionTitle";

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    margin: 0,
    marginTop: "0.4em",
    height: window.innerHeight - 145,
    overflowY: "scroll",
    // border: "2px solid blue",
  },
  loadingStyle: {
    textAlign: "center",
    margin: "2em",
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
}));

function UserVideos({ editable }) {
  const classes = useStyles();
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    userPosts: null,
  });

  const showVideos = () =>
    appState.loading ? (
      <Typography variant="h3" className={classes.loadingStyle}>
        Loading Videos...
      </Typography>
    ) : (
      <VideoContainer userPosts={appState.userPosts} />
    );

  return (
    <div>
      <SectionTitle
        title={"Videos 🎥"}
        btnText={"Add new"}
        EndIcon={AddIcon}
        showForm={showAddVideoForm}
        setShowForm={setShowAddVideoForm}
        canEdit={editable}
      />

      <div className={classes.videoContainer}>
        {showAddVideoForm ? (
          <UploadMultimediaForm
            type={"viceo"}
            setShowForm={setShowAddVideoForm}
          />
        ) : (
          showVideos()
        )}
      </div>
    </div>
  );
}

export default UserVideos;
