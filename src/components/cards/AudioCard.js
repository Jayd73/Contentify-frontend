import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "27.5em",
    height: "11.4em",
    margin: 4,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "17.5em",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 160,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  moreOptIcon: {
    position: "absolute",
  },
  durationStyle: {
    backgroundColor: "black",
    height: "1.5em",
    color: "white",
    display: "inline-block",
    float: "right",
    paddingInline: "0.3em",
    marginTop: "9.6em",
    marginLeft: "-2.6em",
    opacity: 0.8,
  },
}));

function AudioCard({
  imgSrc,
  avatarSrc,
  title,
  listens,
  uploadTime,
  channelName,
  creatorName,
  duration,
}) {
  const classes = useStyles();
  const maxTitleLen = 53;
  const maxCreatorNameLen = 26;
  const maxDetailsLen = 90;
  const details = channelName + " | " + listens + " listens | " + uploadTime;
  creatorName = creatorName ? creatorName : channelName;

  return (
    <Card className={classes.root}>
      <CardMedia component="img" className={classes.cover} image={imgSrc} />
      <div className={classes.durationStyle}>
        <Typography style={{ fontSize: "0.9em" }}>
          {duration ? duration : "5:00"}
        </Typography>
      </div>

      <div className={classes.details}>
        <CardHeader
          disableTypography
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography style={{ fontSize: "1em" }}>
              {title.length > maxTitleLen
                ? title.substring(0, maxTitleLen) + "..."
                : title}
            </Typography>
          }
          subheader={
            <Typography style={{ fontSize: "0.9em" }} color="textSecondary">
              {creatorName.length > maxCreatorNameLen
                ? creatorName.substring(0, maxCreatorNameLen) + "..."
                : creatorName}
            </Typography>
          }
        />
        <div style={{ flexGrow: 1 }} />

        <CardHeader
          style={{ width: "17.5em" }}
          avatar={
            <Avatar
              style={{ height: "2.5em", width: "2.5em" }}
              src={avatarSrc}
            />
          }
          subheader={
            details.length > maxDetailsLen
              ? details.substring(0, maxDetailsLen) + "..."
              : details
          }
        />
      </div>
    </Card>
  );
}

export default AudioCard;
