import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UploadVideoForm from "./UploadVideoForm";
import AddIcon from "@material-ui/icons/Add";
import VideoContainer from "../mainContainer/VideoContainer";
import axiosInstance from "../../axios";
import { useUserState } from "../../contexts/UserContext";
import SectionTitle from "../customizedComponents/SectionTitle";

function UserVideos({ editable }) {
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  return (
    <div>
      <SectionTitle
        title={"Videos 🎥"}
        btnText={"Add new"}
        EndIcon={AddIcon}
        showCreatePostForm={showCreatePostForm}
        setShowCreatePostForm={setShowCreatePostForm}
        canEdit={editable}
      />
    </div>
  );
}

export default UserVideos;
