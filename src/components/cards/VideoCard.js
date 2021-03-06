import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Typography } from "@material-ui/core";

import ShareIcon from "@material-ui/icons/Share";
import { Button } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";

import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import ShareLinkDialog from "../customizedComponents/ShareLinkDialog";

const thumbnailHt = 210;

const useStyles = makeStyles((theme) => ({
  h_root: {
    width: "70%",
    margin: 3,

    // border: "2px solid red",
  },

  h_media: {
    height: thumbnailHt,
    width: (thumbnailHt * 16) / 9,
    // border: "1px solid blue",
  },

  h_durationStyle: {
    backgroundColor: "black",
    color: "white",
    display: "inline-block",
    float: "right",
    paddingInline: "0.5em",
    marginTop: "-1.8em",
    marginRight: "0.4em",
    opacity: 0.8,
  },
  h_topHeader: {
    // border: "1px solid green",
    width: "100%",
    height: "4.5em",
  },

  root: {
    width: 326,
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
  avatarSrc,
  title,
  views,
  timeAgo,
  channelName,
  duration,
  variant,
  cardWidth,
  videoData,
  isLoggedInUser,
  reloadReq,
  fitHtToText,
}) => {
  const classes = useStyles();
  const maxTitleLen = 25;
  const maxDetailsLen = 90;
  const maxDescrpLen = 180;
  const viewsForm = views == 1 ? "view" : "views";
  const details =
    channelName + " | " + views + " " + viewsForm + " | " + timeAgo;
  const h_details = views + " " + viewsForm + " | " + timeAgo;
  const descrp_snippet =
    videoData.description.length > maxDescrpLen
      ? videoData.description.substring(0, maxDescrpLen) + "..."
      : videoData.description;

  const history = useHistory();
  const [userState, setUserState] = useUserState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showComponent, setShowComponent] = useState(true);
  const [openConfDialog, setOpenConfDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  let postLinkAddress = `${window.location.host}/channel/${videoData.channel.slug}/video/${videoData.slug}`;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverActions = [
    {
      name: "Delete",
      icon: <DeleteIcon />,
      onClick: (e) => {
        e.stopPropagation();
        setOpenConfDialog(true);
      },
      isPublic: false,
    },
    {
      name: "Share",
      icon: <ShareIcon />,
      onClick: (e) => {
        e.stopPropagation();
        handleShare();
      },
      isPublic: true,
    },
  ];

  const [popOverAct, setPopOverAct] = useState(popoverActions);

  useEffect(() => {
    if (!isLoggedInUser) {
      setPopOverAct(popOverAct.filter((act) => act.isPublic));
    }
  }, []);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setOpenConfDialog(false);
    axiosInstance
      .delete(`video/delete/${videoData.id}/`)
      .then((res) => {
        setShowComponent(false);
      })
      .catch((err) => {
        console.log("Error while deleting: ", err);
      });
    // setDeletedPosts(deletedPosts + 1);
    userState.setSnackbarMsg("Video deleted successfully");
    userState.setSnackbarOpen(true);
  };

  const handleAlertClose = () => {
    setAnchorEl(null);
    setOpenConfDialog(false);
  };

  const handleShare = () => {
    setOpenShareDialog(true);
  };

  const goForPlaying = () => {
    history.push(`/channel/${videoData.channel.slug}/video/${videoData.slug}`);
    if (reloadReq) {
      window.location.reload();
    }
  };

  if (variant == "horizontal") {
    return (
      <>
        {showComponent ? (
          <Card className={classes.h_root} style={{ width: cardWidth }}>
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
              {popOverAct.map((item) => (
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
                {"Are you sure you want to delete this video?"}
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
            <ShareLinkDialog
              open={openShareDialog}
              setOpen={setOpenShareDialog}
              linkAddress={postLinkAddress}
              setAnchorEl={setAnchorEl}
            />

            <div style={{ display: "flex" }}>
              <div className={classes.h_media}>
                <CardActionArea onClick={goForPlaying}>
                  <CardMedia className={classes.h_media} image={imgSrc} />
                  <div className={classes.h_durationStyle}>
                    <Typography style={{ fontSize: "1em" }}>
                      {duration ? duration : "10:00"}
                    </Typography>
                  </div>
                </CardActionArea>
              </div>
              <div style={{ width: "100%" }}>
                <CardHeader
                  className={classes.h_topHeader}
                  disableTypography
                  action={
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    <Typography
                      style={{ fontSize: "1.2em", wordWrap: "break-word" }}
                      onClick={goForPlaying}
                    >
                      {title.length > maxTitleLen
                        ? title.substring(0, maxTitleLen) + "..."
                        : title}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      style={{ fontSize: "0.9em" }}
                      color="textSecondary"
                      onClick={goForPlaying}
                    >
                      {h_details.length > maxDetailsLen
                        ? h_details.substring(0, maxDetailsLen) + "..."
                        : h_details}
                    </Typography>
                  }
                />
                <CardContent
                  style={{
                    // border: "1px solid blue",
                    width: "100%",
                    height: "4.1em",
                  }}
                  onClick={goForPlaying}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {descrp_snippet}
                  </Typography>
                </CardContent>
                <CardHeader
                  style={{ padding: "1em" }}
                  avatar={
                    <Avatar
                      style={{ height: "2em", width: "2em" }}
                      src={avatarSrc}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/channel/${videoData.channel.slug}`);
                      }}
                    />
                  }
                  title={
                    <Typography
                      style={{ fontSize: "1.1em", wordWrap: "break-word" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/channel/${videoData.channel.slug}`);
                      }}
                    >
                      {channelName.length > maxTitleLen
                        ? channelName.substring(0, maxTitleLen) + "..."
                        : channelName}
                    </Typography>
                  }
                />
              </div>
            </div>
          </Card>
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <>
      {showComponent ? (
        <Card
          className={classes.root}
          style={
            fitHtToText
              ? { width: cardWidth }
              : { width: cardWidth, height: cardWidth * 0.83 }
          }
        >
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
            {popOverAct.map((item) => (
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
              {"Are you sure you want to delete this video?"}
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
          <ShareLinkDialog
            open={openShareDialog}
            setOpen={setOpenShareDialog}
            linkAddress={postLinkAddress}
            setAnchorEl={setAnchorEl}
          />
          <CardActionArea onClick={goForPlaying}>
            <CardMedia className={classes.media} image={imgSrc} />
            <div className={classes.durationStyle}>
              <Typography style={{ fontSize: "1em" }}>
                {duration ? duration : "10:00"}
              </Typography>
            </div>
          </CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                style={{ height: "2.3em", width: "2.3em" }}
                src={avatarSrc}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/channel/${videoData.channel.slug}`);
                }}
              />
            }
            action={
              <IconButton onClick={handleMenuClick}>
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
      ) : (
        ""
      )}
    </>
  );
};

export default VideoCard;
