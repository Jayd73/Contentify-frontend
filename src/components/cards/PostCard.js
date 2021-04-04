import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";

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

import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
    marginBottom: "0.5em",
  },
  media: {
    // paddingTop: "80%",
    height: "25em",
    objectFit: "contain",
    backgroundColor: "black",
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
    alignItems: "center",
    marginBottom: "0.5em",
  },
  commentInput: {
    width: "23em",
    marginInline: 15,
  },
}));

const PostCard = ({
  avatarSrc,
  uname,
  date,
  imgSrc,
  text,
  isLoggedInUser,
  userPostID,
  deletedPosts,
  setDeletedPosts,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [userState, setUserState] = useUserState();
  const [liked, setLiked] = React.useState(false);
  const [commentCards, setCommentCards] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showComponent, setShowComponent] = React.useState(true);
  const [openConfDialog, setOpenConfDialog] = React.useState(false);
  const [deleteConf, setDeleteConf] = React.useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverActions = [
    {
      name: "Delete",
      icon: <DeleteIcon />,
      onClick: () => {
        setOpenConfDialog(true);
      },
    },
  ];

  const handleMenuClick = (event) => {
    if (isLoggedInUser) {
      setAnchorEl(event.currentTarget);
    }
  };

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

  const handleDelete = () => {
    setOpenConfDialog(false);
    axiosInstance
      .delete(`userpost/delete/${userPostID}/`)
      .then((res) => {
        // setUserPostsList(
        //   userPostsList.filter((item) => item.id !== userPostID)
        // );
        setShowComponent(false);
      })
      .catch((err) => {
        console.log("Error while deleting: ", err);
      });
    setDeletedPosts(deletedPosts + 1);
  };

  const handleAlertClose = () => {
    setAnchorEl(null);
    setOpenConfDialog(false);
  };

  return (
    <>
      {showComponent ? (
        <Card className={classes.root}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {popoverActions.map((item) => (
              <ListItem
                button
                key={item.name}
                onClick={item.onClick}
                style={{ height: "3em" }}
              >
                <ListItemAvatar>{item.icon}</ListItemAvatar>
                <ListItemText
                  style={{ marginLeft: "-1.5em" }}
                  primary={item.name}
                />
              </ListItem>
            ))}
          </Popover>
          <Dialog open={openConfDialog} onClose={handleAlertClose}>
            <DialogTitle>
              {"Are you sure you want to delete this post?"}
            </DialogTitle>
            {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
            <DialogActions>
              <Button onClick={handleAlertClose} color="primary" autoFocus>
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <CardHeader
            avatar={
              <Avatar
                style={{ width: "2.5em", height: "2.5em" }}
                src={avatarSrc}
              />
            }
            action={
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={<Typography style={{ fontSize: "1em" }}>{uname}</Typography>}
            subheader={date}
          />
          {text ? (
            <CardContent>
              <Typography
                style={{ fontSize: "1.2em" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {text}
              </Typography>
            </CardContent>
          ) : null}

          {imgSrc ? (
            <CardMedia
              component="img"
              className={classes.media}
              image={imgSrc}
            />
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
              {/* <CommentCard
          uname="John Kepler"
          timeAgo="3 minutes"
          text="I am ready to start learning !"
        /> */}
              <CommentCard
                uname="Nathan Evans"
                timeAgo="10 days"
                text="Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM."
              />
              {commentCards.map((CmntCard) => CmntCard)}
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default PostCard;
