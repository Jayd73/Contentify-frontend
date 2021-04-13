import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { abbreviateNumber } from "../miscellaneous/HelperFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxHeight: "fit-content",
    margin: "0.5em",
    padding: "1em",
  },
  rightContainer: {
    padding: "0.5em",
    paddingLeft: "2em",
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  actionBtn: {
    paddingInline: "1.7em",
    marginInline: "1em",
    height: "3em",
  },
  abtSnippet: {
    fontSize: "1em",
    color: theme.palette.appBg.darkest,
    margin: "1em 0em",
    wordWrap: "break-word",
  },
}));

function ChannelCard({ channelData, showAbout, isUserFollowing }) {
  const classes = useStyles();
  const history = useHistory();
  const [isFollowing, setisFollowing] = React.useState(isUserFollowing);
  const [followers, setFollowers] = React.useState(channelData.followers);
  const aboutSnippetMaxLen = 190;

  const toggleFollow = () => {
    setisFollowing(!isFollowing);
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
  };

  return (
    <Card className={classes.root}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          style={{ height: "5em", width: "5em" }}
          src={channelData.avatar}
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/channel/${channelData.slug}`);
          }}
        />
        <div className={classes.rightContainer}>
          <div style={{ flexGrow: 1 }}>
            {" "}
            <Typography style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              {channelData.user.username}
            </Typography>
            {showAbout ? (
              <Typography className={classes.abtSnippet}>
                {channelData.about.length > aboutSnippetMaxLen
                  ? channelData.about.substring(0, aboutSnippetMaxLen) + "..."
                  : channelData.about}
              </Typography>
            ) : (
              ""
            )}
            <Typography style={{ fontSize: "1.1em" }}>
              {abbreviateNumber(followers)}{" "}
              {followers == 1 ? "follower" : "followers"}
            </Typography>
          </div>

          <Button
            className={classes.actionBtn}
            variant="contained"
            color={isFollowing ? "secondary" : "primary"}
            onClick={toggleFollow}
          >
            {isFollowing ? "Followed" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ChannelCard;
