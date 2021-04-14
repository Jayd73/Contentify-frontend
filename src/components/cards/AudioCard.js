import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";

import { useState, useEffect } from "react";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";

import ShareIcon from "@material-ui/icons/Share";
import { Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import ShareLinkDialog from "../customizedComponents/ShareLinkDialog";

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
    textAlign: "right",
    // paddingInline: "0.3em",
    // marginTop: "9.6em",
    // marginLeft: "-2.6em",
    opacity: 0.8,
  },
}));

function AudioCard({
  imgSrc,
  avatarSrc,
  title,
  listens,
  timeAgo,
  channelName,
  creatorName,
  duration,
  cardWidth,
  audioData,
  isLoggedInUser,
  reloadReq,
}) {
  const classes = useStyles();
  const maxTitleLen = 45;
  const maxCreatorNameLen = 26;
  const maxDetailsLen = 90;
  const coverWidth = 0.35 * cardWidth;
  const listensForm = listens == 1 ? "listen" : "listens";
  const details =
    channelName + " | " + listens + " " + listensForm + " | " + timeAgo;
  creatorName = audioData.subheader ? audioData.subheader : channelName;

  const history = useHistory();
  const [userState, setUserState] = useUserState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showComponent, setShowComponent] = useState(true);
  const [openConfDialog, setOpenConfDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  creatorName = creatorName ? creatorName : channelName;
  let postLinkAddress = `${window.location.host}/channel/${audioData.channel.slug}/audio/${audioData.slug}`;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverActions = [
    {
      name: "Delete",
      icon: <DeleteIcon />,
      onClick: (e) => {
        e.preventDefault();
        setOpenConfDialog(true);
      },
      isPublic: false,
    },
    {
      name: "Share",
      icon: <ShareIcon />,
      onClick: (e) => {
        e.preventDefault();
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

  const handleMenuClick = (e) => {
    // e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleDelete = () => {
    setOpenConfDialog(false);
    axiosInstance
      .delete(`audio/delete/${audioData.id}/`)
      .then((res) => {
        setShowComponent(false);
      })
      .catch((err) => {
        console.log("Error while deleting: ", err);
      });
    // setDeletedPosts(deletedPosts + 1);
    userState.setSnackbarMsg("Audio deleted successfully");
    userState.setSnackbarOpen(true);
  };

  const handleAlertClose = () => {
    setAnchorEl(null);
    setOpenConfDialog(false);
  };

  const handleShare = () => {
    setOpenShareDialog(true);
  };

  const goForPlaying = (e) => {
    history.push(`/channel/${audioData.channel.slug}/audio/${audioData.slug}`);
    if (reloadReq) {
      window.location.reload();
    }
  };

  return (
    <>
      {showComponent ? (
        <Card
          className={classes.root}
          style={{ width: cardWidth, height: 0.4 * cardWidth }}
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
              {"Are you sure you want to delete this audio?"}
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

          <CardMedia
            component="img"
            className={classes.cover}
            image={imgSrc}
            style={{ width: coverWidth }}
            onClick={goForPlaying}
          />

          <div
            className={classes.durationStyle}
            style={{
              height: 0.045 * cardWidth,
              position: "absolute",
              paddingInline: 0.01 * cardWidth,
              marginTop: 0.355 * cardWidth,
              marginLeft: 0.255 * cardWidth - (duration.length > 5 ? 20 : 0),
            }}
          >
            <Typography style={{ fontSize: 0.03 * cardWidth }}>
              {duration ? duration : "5:00"}
            </Typography>
          </div>

          <div
            className={classes.details}
            style={{ width: cardWidth - coverWidth }}
          >
            <CardHeader
              style={{ padding: 0.03 * cardWidth }}
              disableTypography
              action={
                <IconButton onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography
                  style={{
                    fontSize: 0.038 * cardWidth,
                    wordWrap: "break-word",
                  }}
                  onClick={goForPlaying}
                >
                  {title.length > maxTitleLen
                    ? title.substring(0, maxTitleLen) + "..."
                    : title}
                </Typography>
              }
              subheader={
                <Typography
                  style={{ fontSize: 0.035 * cardWidth }}
                  color="textSecondary"
                  onClick={goForPlaying}
                >
                  {creatorName.length > maxCreatorNameLen
                    ? creatorName.substring(0, maxCreatorNameLen) + "..."
                    : creatorName}
                </Typography>
              }
            />
            <div style={{ flexGrow: 1 }} />

            <CardHeader
              style={{ width: "100%", padding: 0.03 * cardWidth }}
              avatar={
                <Avatar
                  style={{ height: 0.12 * cardWidth, width: 0.12 * cardWidth }}
                  src={avatarSrc}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/channel/${audioData.channel.slug}`);
                  }}
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
      ) : (
        ""
      )}
    </>
  );
}

export default AudioCard;
