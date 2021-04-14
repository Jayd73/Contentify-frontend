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
    // border: "2px solid green",
  },
  followingContainer: {
    margin: "0.5em",
    minHeight: window.innerHeight - 145,
    overflowY: "auto",
    maxHeight: "fit-content",
    width: "85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // border: "2px solid green",
  },
  message: {
    textAlign: "center",
    margin: "2em",
    fontSize: "2em",
    color: theme.palette.appBg.darkest,
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
          {followedChannels.length > 0 ? (
            followedChannels.map((channel) => (
              <ChannelCard
                channelData={channel}
                key={channel.id}
                isUserFollowing={true}
              />
            ))
          ) : (
            <Typography className={classes.message}>
              You are not following any channels
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserFollowing);
