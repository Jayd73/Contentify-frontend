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
}));

function CommentContainer({ commentOn, componentID }) {
  const classes = useStyles();
  const [userState, setUserState] = useUserState();
  const [commentCards, setCommentCards] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`comment/${commentOn}/${componentID}/`)
      .then((res) => {
        const allComments = res.data;
        console.log("All comments: ", allComments);
        allComments.map((comment) => {
          setCommentCards([
            ...commentCards,
            <CommentCard
              key={res.data.id}
              avatarSrc={comment.channel.avatar}
              timeAgo={dayjs(comment.posted_date).fromNow()}
              commentData={comment}
            />,
          ]);
        });
      })
      .catch((err) => {
        console.log("Error while getting comments: ", err);
      });
  }, []);

  const postComment = () => {
    axiosInstance
      .post(`comment/create/${commentOn}/${componentID}/`, {
        text: comment,
      })
      .then((res) => {
        setCommentCards([
          ...commentCards,
          <CommentCard
            key={res.data.id}
            avatarSrc={userState.userAvatar}
            timeAgo={dayjs(new Date()).fromNow()}
            commentData={res.data}
          />,
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
      {commentCards.map((CmntCard) => CmntCard)}
    </div>
  );
}

export default CommentContainer;
