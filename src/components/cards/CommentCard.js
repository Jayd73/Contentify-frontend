import React, { useEffect } from "react";
import { useUserState } from "../../contexts/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axiosInstance from "../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "0.2em",
    marginTop: "0.2em",
    boxShadow: "none",
    border: "none",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  commentText: {
    fontSize: "1em",
    color: theme.palette.appBg.darkest,
    wordWrap: "break-word",
  },
}));

const CommentCard = ({ timeAgo, avatarSrc, commentData }) => {
  const classes = useStyles();
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(commentData.likes);
  const [userState, setUserState] = useUserState();
  const postingTime = timeAgo;

  useEffect(() => {
    if (
      commentData.liked_by.some(
        (channel) => channel.id === userState.moreChannelData.id
      )
    ) {
      setLiked(true);
    }
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
    let currLikes = likes;
    if (liked) {
      currLikes -= 1; // Doing the opposite bcoz useState has not updated the values yet
      setLikes(likes - 1);
    } else {
      currLikes += 1;
      setLikes(likes + 1);
    }

    axiosInstance
      .patch(`comment/updatelikes/${commentData.id}/`, {
        likes: currLikes,
      })
      .then((res) => {
        setLikes(res.data.likes);
      })
      .catch((err) => {
        console.log("Error while updating likes: ", err.response);
      });
  };

  return (
    <Card className={classes.root} variant="outlined" raised={false}>
      <CardHeader
        style={{ marginLeft: "-1em" }}
        avatar={<Avatar src={avatarSrc} />}
        title={commentData.channel.user.username}
        subheader={postingTime}
      />
      <div
        style={{
          marginTop: "-1.3em",
          marginLeft: "2.45em",
        }}
      >
        <CardContent>
          <Typography
            className={classes.commentText}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {commentData.text}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          style={{ marginTop: "-1em", marginLeft: "-0.3em" }}
        >
          <IconButton aria-label="likes" onClick={toggleLike}>
            <ThumbUpIcon color={liked ? "primary" : "inherit"} />
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">
            {likes}
          </Typography>
        </CardActions>
      </div>
    </Card>
  );
};

export default CommentCard;
