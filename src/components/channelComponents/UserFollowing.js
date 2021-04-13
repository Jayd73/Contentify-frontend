import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import axiosInstance from "../../axios";

import SectionTitle from "../customizedComponents/SectionTitle";
import ChannelCard from "../cards/ChannelCard";

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

function UserFollowing(props) {
  const classes = useStyles();
  const followedChannels = props.location && props.location.state;

  return (
    <div className={classes.root}>
      <SectionTitle title={"Following ✅"} noButton={true} />
      <div className={classes.alignStyle}>
        <div className={classes.followingContainer}>
          {followedChannels.map((channel) => (
            <ChannelCard
              channelData={channel}
              key={channel.id}
              isUserFollowing={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserFollowing);
