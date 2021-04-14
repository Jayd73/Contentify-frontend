import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
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
import { Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonBase from "@material-ui/core/ButtonBase";

import ShareLinkDialog from "../customizedComponents/ShareLinkDialog";
import CommentContainer from "../mainContainer/CommentContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
    marginBottom: "0.5em",
  },
  media: {
    // paddingTop: "80%",
    height: "27em",
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
  postText: {
    fontSize: "1.2em",
    color: theme.palette.appBg.darkest,
    marginTop: "-0.5em",
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
  userPostChannelSlug,
  userPostSlug,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [userState, setUserState] = useUserState();
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showComponent, setShowComponent] = useState(true);
  const [openConfDialog, setOpenConfDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  let postLinkAddress = `${window.location.host}/channel/${userPostChannelSlug}/posts/${userPostSlug}`;

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
    userState.setSnackbarMsg("Post deleted successfully");
    userState.setSnackbarOpen(true);
  };

  const handleAlertClose = () => {
    setAnchorEl(null);
    setOpenConfDialog(false);
  };

  const handleShare = () => {
    setAnchorEl(null);
    setOpenShareDialog(true);
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
              <ButtonBase centerRipple>
                <Avatar
                  style={{ width: "2.5em", height: "2.5em" }}
                  src={avatarSrc}
                  onClick={() =>
                    history.push(`/channel/${userPostChannelSlug}`)
                  }
                />
              </ButtonBase>
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
                className={classes.postText}
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
            <IconButton aria-label="share" onClick={handleShare}>
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
            <ShareLinkDialog
              open={openShareDialog}
              setOpen={setOpenShareDialog}
              linkAddress={postLinkAddress}
            />
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.comment}>
              <CommentContainer
                commentOn={"userpost"}
                componentID={userPostID}
              />
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
