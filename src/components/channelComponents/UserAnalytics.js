import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import axiosInstance from "../../axios";

import Card from "@material-ui/core/Card";

import SectionTitle from "../customizedComponents/SectionTitle";

const useStyles = makeStyles((theme) => ({
  analyticsContainer: {
    margin: 0,
    marginTop: "0.4em",
    height: window.innerHeight - 145,
    overflowY: "scroll",
    // border: "2px solid blue",
  },
  followerCard: {
    maxWidth: "fit-content",
    margin: "0.5em",
    marginInline: "1em",
    display: "flex",
    alignItems: "center",
    paddingInline: "1em",
  },
  followIconStyle: {
    fontSize: "6em",
    margin: "0.15em",
    marginRight: "0.2em",
    color: theme.palette.primary.main,
  },
  followerCount: {
    fontSize: "3em",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
}));

function UserAnalytics() {
  const classes = useStyles();
  return (
    <div>
      <SectionTitle title={"Analytics 📈"} noButton={true} />
      <div className={classes.analyticsContainer}>
        <Card className={classes.followerCard}>
          <Icon className={classes.followIconStyle}>person_add</Icon>
          <div>
            <Typography
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginBottom: "-0.6em",
              }}
            >
              Followers
            </Typography>
            <Typography className={classes.followerCount}>{1789747}</Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserAnalytics;
