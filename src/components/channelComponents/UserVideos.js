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

function UserVideos({ editable, currChannelID }) {
  const classes = useStyles();
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    videos: null,
  });

  useEffect(() => {
    if (currChannelID) {
      axiosInstance
        .get(`video/channel/${currChannelID}/`)
        .then((res) => {
          setAppState({ loading: false, videos: res.data });
          console.log("Got posts data: ", res.data);
        })
        .catch((err) => {
          console.log("Error from API: ", err);
        });
    }
  }, [setAppState, currChannelID]);

  const showVideos = () =>
    appState.loading ? (
      <Typography variant="h3" className={classes.loadingStyle}>
        Loading Videos...
      </Typography>
    ) : (
      <VideoContainer videos={appState.videos} />
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
            type={"video"}
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
