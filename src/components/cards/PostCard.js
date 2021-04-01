import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import CommentCard from "./CommentCard";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 600,
    marginBottom: "0.5em",
  },
  media: {
    height: 0,
    paddingTop: "80%",
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
  comment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  commentBox: {
    display: "flex",
    alignItems: "left",
  },
  commentInput: {
    width: 415,
    marginInline: 20,
  },
}));

const PostCard = ({ avatarSrc, uname, date, imgSrc, text, loggedInUname }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [userState, setUserState] = useUserState();
  const [liked, setLiked] = React.useState(false);
  const [commentCards, setCommentCards] = React.useState([]);
  const [comment, setComment] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const postComment = () => {
    setCommentCards([
      ...commentCards,
      <CommentCard
        avatarSrc={userState.userAvatar}
        uname={userState.username}
        text={comment}
        timeAgo="Few moments"
      />,
    ]);

    setComment("");
  };

  const handleCommentOnChange = ({ target }) => {
    setComment(target.value);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={avatarSrc} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={uname}
        subheader={date}
      />
      {imgSrc ? <CardMedia className={classes.media} image={imgSrc} /> : null}

      {text ? (
        <CardContent>
          <Typography
            style={{ fontSize: "1.5em" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {text}
          </Typography>
        </CardContent>
      ) : null}

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleLike}>
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comment"
        >
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.comment}>
          <Typography
            style={{ fontSize: "1.2em" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Comments
          </Typography>
          <div className={classes.commentBox}>
            <Avatar src={userState.userAvatar} />
            <TextField
              size="small"
              multiline
              variant="outlined"
              placeholder="Comment..."
              className={classes.commentInput}
              onChange={handleCommentOnChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ height: "2rem" }}
              onClick={postComment}
            >
              POST
            </Button>
          </div>
          <CommentCard
            uname="John Kepler"
            timeAgo="3 minutes"
            text="I am ready to start learning !"
          />
          <CommentCard
            uname="Nathan Evans"
            timeAgo="10 days"
            text="Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM."
          />
          {commentCards.map((CmntCard) => CmntCard)}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
