import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UploadAudioForm from "./UploadAudioForm";
import AddIcon from "@material-ui/icons/Add";
import AudioContainer from "../mainContainer/AudioContainer";
import axiosInstance from "../../axios";
import { useUserState } from "../../contexts/UserContext";

import SectionTitle from "../customizedComponents/SectionTitle";

function UserAudios({ editable }) {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  return (
    <div>
      <SectionTitle
        title={"Audios 🎶"}
        btnText={"Add new"}
        EndIcon={AddIcon}
        showCreatePostForm={showCreatePostForm}
        setShowCreatePostForm={setShowCreatePostForm}
        canEdit={editable}
      />
    </div>
  );
}

export default UserAudios;
