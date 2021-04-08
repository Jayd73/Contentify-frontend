import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UploadMultimediaForm from "./UploadMultimediaForm";
import AddIcon from "@material-ui/icons/Add";
import AudioContainer from "../mainContainer/AudioContainer";
import axiosInstance from "../../axios";
import { useUserState } from "../../contexts/UserContext";

import SectionTitle from "../customizedComponents/SectionTitle";

const useStyles = makeStyles((theme) => ({
  audioContainer: {
    margin: 0,
    marginTop: "0.2em",
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

function UserAudios({ editable, currChannelID }) {
  const classes = useStyles();
  const [showAddAudioForm, setShowAddAudioForm] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    audios: null,
  });

  useEffect(() => {
    if (currChannelID) {
      axiosInstance
        .get(`audio/channel/${currChannelID}/`)
        .then((res) => {
          setAppState({ loading: false, audios: res.data });
          console.log("Got posts data: ", res.data);
        })
        .catch((err) => {
          console.log("Error from API: ", err);
        });
    }
  }, [setAppState, currChannelID]);

  const showAudios = () =>
    appState.loading ? (
      <Typography variant="h3" className={classes.loadingStyle}>
        Loading Audios...
      </Typography>
    ) : (
      <AudioContainer audios={appState.audios} />
    );

  return (
    <div>
      <SectionTitle
        title={"Audios 🎶"}
        btnText={"Add new"}
        EndIcon={AddIcon}
        showForm={showAddAudioForm}
        setShowForm={setShowAddAudioForm}
        canEdit={editable}
      />

      <div className={classes.audioContainer}>
        {showAddAudioForm ? (
          <UploadMultimediaForm
            type={"audio"}
            setShowForm={setShowAddAudioForm}
          />
        ) : (
          showAudios()
        )}
      </div>
    </div>
  );
}

export default UserAudios;
