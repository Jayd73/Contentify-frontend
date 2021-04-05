import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 326,
    minWidth: 326,
    margin: 5,
    marginTop: 3,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  durationStyle: {
    backgroundColor: "black",
    color: "white",
    display: "inline-block",
    float: "right",
    paddingInline: "0.5em",
    marginTop: "-1.8em",
    marginRight: "0.4em",
    opacity: 0.8,
  },
}));

const VideoCard = ({
  imgSrc,
  imgTitle,
  avatarSrc,
  title,
  views,
  timeAgo,
  channelName,
  duration,
}) => {
  const classes = useStyles();
  const maxTitleLen = 25;
  const maxDetailsLen = 90;
  const details = channelName + " | " + views + " views | " + timeAgo;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imgSrc} title={imgTitle} />
        <div className={classes.durationStyle}>
          <Typography style={{ fontSize: "1em" }}>
            {duration ? duration : "10:00"}
          </Typography>
        </div>
      </CardActionArea>
      <CardHeader
        avatar={
          <Avatar style={{ height: "2.3em", width: "2.3em" }} src={avatarSrc} />
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          title.length > maxTitleLen
            ? title.substring(0, maxTitleLen) + "..."
            : title
        }
        subheader={
          details.length > maxDetailsLen
            ? details.substring(0, maxDetailsLen) + "..."
            : details
        }
      />
      {/* </CardActionArea> */}
    </Card>
  );
};

export default VideoCard;
