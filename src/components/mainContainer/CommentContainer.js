import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CommentCard from "../cards/CommentCard";
import EmojiTextField from "../customizedComponents/EmojiTextField";

let dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // border: "1px solid blue",
    marginBottom: "0.5em",
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  commentBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5em",
  },
  commentInput: {
    flexGrow: 1,
    // width: "23em",
    marginInline: 15,
  },
  message: {
    color: theme.palette.appBg.darkest,
    fontSize: "1.6em",
    margin: "2em",
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.5,
  },
}));

function CommentContainer({ commentOn, componentID }) {
  const classes = useStyles();
  const [userState, setUserState] = useUserState();
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`comment/${commentOn}/${componentID}/`)
      .then((res) => {
        const allComments = res.data;
        let cmntData = [];
        allComments.map((comment) => {
          cmntData.push({
            avatarSrc: comment.channel.avatar,
            timeAgo: dayjs(comment.posted_date).fromNow(),
            moreData: comment,
          });
        });
        setCommentData(cmntData);
      })
      .catch((err) => {
        console.log("Error while getting comments: ", err);
      });
  }, []);

  const postComment = () => {
    if (!comment) {
      return;
    }
    axiosInstance
      .post(`comment/create/${commentOn}/${componentID}/`, {
        text: comment,
      })
      .then((res) => {
        setCommentData([
          ...commentData,
          {
            avatarSrc: userState.userAvatar,
            timeAgo: dayjs(new Date()).fromNow(),
            moreData: res.data,
          },
        ]);
        setComment("");
      })
      .catch((err) => {
        console.log("Error while deleting: ", err);
      });
  };

  const handleCommentOnChange = ({ target }) => {
    setComment(target.value);
  };

  return (
    <div className={classes.root}>
      <Typography
        style={{ fontSize: "1.2em", margin: "0.5em", textAlign: "center" }}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        Comments
      </Typography>
      <div className={classes.commentBox}>
        <Avatar src={userState.userAvatar} />
        <EmojiTextField
          size="small"
          multiline
          variant="outlined"
          value={comment}
          placeholder="Comment..."
          className={classes.commentInput}
          onChange={handleCommentOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ height: "2.5rem" }}
          onClick={postComment}
        >
          POST
        </Button>
      </div>

      {commentData.length == 0 ? (
        <Typography className={classes.message}>
          No comments made yet
        </Typography>
      ) : (
        ""
      )}

      {commentData.map((comment) => (
        <CommentCard
          key={comment.moreData.id}
          avatarSrc={comment.avatarSrc}
          timeAgo={comment.timeAgo}
          commentData={comment.moreData}
        />
      ))}
    </div>
  );
}

export default CommentContainer;
