import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import AudioCard from "../cards/AudioCard";
import { useUserState } from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";

import {
  abbreviateNumber,
  getTimeFromSecs,
} from "../miscellaneous/HelperFunctions";

let dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  message: {
    textAlign: "center",
    margin: "2em",
    fontSize: "2em",
    marginLeft: "9.5em",
    color: theme.palette.appBg.darkest,
  },
}));

const AudioContainer = (props) => {
  let allAudios = (props.location && props.location.state) || props.allAudios;
  const audios = props.audios;
  const variant = props.variant;
  const cardWidth = props.cardWidth ? props.cardWidth : 441;
  const classes = useStyles();
  const [userState, setUserState] = useUserState();

  const audioCards = (audioList, cardWidth) =>
    audioList.map((audio) => (
      <Grid item key={audio.uid}>
        <AudioCard
          key={audio.uid}
          avatarSrc={audio.channel.avatar}
          imgSrc={audio.cover}
          title={audio.title}
          channelName={audio.channel.user.username}
          timeAgo={dayjs(audio.upload_date).fromNow()}
          listens={abbreviateNumber(audio.plays)}
          duration={getTimeFromSecs(audio.duration)}
          audioData={audio}
          cardWidth={cardWidth}
          isLoggedInUser={userState.moreChannelData.id == audio.channel.id}
          reloadReq={props.reloadReq}
        />
      </Grid>
    ));

  if (allAudios) {
    // for populating the container
    if (props.location.state) {
      for (let i = 0; i < 3; i++) {
        allAudios = [...allAudios].concat(allAudios);
      }
    }
    return (
      <Grid
        container
        direction={props.gridDirection && props.gridDirection}
        className={classes.gridContainer}
      >
        {audioCards(allAudios, cardWidth)}
      </Grid>
    );
  }

  return (
    <Grid
      container
      className={classes.gridContainer}
      style={variant === "horizontal" ? { justifyContent: "center" } : {}}
    >
      {audios && audios.length > 0 ? (
        audioCards(audios, variant === "horizontal" ? "65em" : 367)
      ) : (
        //
        <Typography className={classes.message}>
          There are no audios on this channel
        </Typography>
      )}
    </Grid>
  );
};

export default withRouter(AudioContainer);

// const cardData = [
//   {
//     imgSrc:
//       "https://images-na.ssl-images-amazon.com/images/I/91YH0ZtB9XL.jpg",
//     title: "Harry Potter and the Half-Blood Prince",
//     creatorName: "J.K.Rowling",
//     channelName: "Fantasy Audiobooks",
//     avatarSrc: "https://avatarfiles.alphacoders.com/172/thumb-172065.jpg",
//     listens: "3.2M",
//     uploadTime: "2 years ago",
//   },
//   {
//     imgSrc:
//       "https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg",
//     title: "Perfect",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - ÷",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "15M",
//     uploadTime: "3 years ago",
//   },
//   {
//     imgSrc:
//       "https://m.media-amazon.com/images/M/MV5BMmZlNmVmNGItM2RmOS00ZTE3LTk2M2QtNWY0ZmQ2NGZlOGRiXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_.jpg",
//     title: "Cosmic Queries - Edge of the Universe",
//     channelName: "StarTalk",
//     creatorName: "With Neil Degrasse Tyson and Chuck Nice",
//     avatarSrc:
//       "https://i1.sndcdn.com/avatars-yHXC7ACv50JD3AIz-st2Vqg-t240x240.jpg",
//     listens: "600K",
//     uploadTime: "7 months",
//   },
//   {
//     imgSrc:
//       "https://i.pinimg.com/736x/d1/0f/6e/d10f6eba68fcbf7fc1cd4ffd4e7eef3d.jpg",
//     title: "Thinking Out Loud",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - +",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "70M",
//     uploadTime: "7 years ago",
//   },
//   {
//     imgSrc:
//       "https://img1.od-cdn.com/ImageType-400/0874-1/9CC/781/EA/%7B9CC781EA-2F1E-4F19-A8F7-C522DB48E31C%7DImg400.jpg",
//     title: "The Fellowship of the Ring - Lord of the Rings Part I",
//     channelName: "Tolkeinverse",
//     creatorName: "J.R.R.Tolkein",
//     avatarSrc:
//       "https://mocah.org/uploads/posts/4589245-gandalf-wizard-low-poly-pipes-the-lord-of-the-rings-fantasy-art-artwork.jpg",
//     listens: "434K",
//     uploadTime: "7 days ago",
//   },
//   {
//     imgSrc:
//       "https://images-na.ssl-images-amazon.com/images/I/91YH0ZtB9XL.jpg",
//     title: "Harry Potter and the Half-Blood Prince",
//     creatorName: "J.K.Rowling",
//     channelName: "Fantasy Audiobooks",
//     avatarSrc: "https://avatarfiles.alphacoders.com/172/thumb-172065.jpg",
//     listens: "3.2M",
//     uploadTime: "2 years ago",
//   },
//   {
//     imgSrc:
//       "https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg",
//     title: "Perfect",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - ÷",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "15M",
//     uploadTime: "3 years ago",
//   },
//   {
//     imgSrc:
//       "https://m.media-amazon.com/images/M/MV5BMmZlNmVmNGItM2RmOS00ZTE3LTk2M2QtNWY0ZmQ2NGZlOGRiXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_.jpg",
//     title: "Cosmic Queries - Edge of the Universe",
//     channelName: "StarTalk",
//     creatorName: "With Neil Degrasse Tyson and Chuck Nice",
//     avatarSrc:
//       "https://i1.sndcdn.com/avatars-yHXC7ACv50JD3AIz-st2Vqg-t240x240.jpg",
//     listens: "600K",
//     uploadTime: "7 months",
//   },
//   {
//     imgSrc:
//       "https://i.pinimg.com/736x/d1/0f/6e/d10f6eba68fcbf7fc1cd4ffd4e7eef3d.jpg",
//     title: "Thinking Out Loud",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - +",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "70M",
//     uploadTime: "7 years ago",
//   },
//   {
//     imgSrc:
//       "https://img1.od-cdn.com/ImageType-400/0874-1/9CC/781/EA/%7B9CC781EA-2F1E-4F19-A8F7-C522DB48E31C%7DImg400.jpg",
//     title: "The Fellowship of the Ring - Lord of the Rings Part I",
//     channelName: "Tolkeinverse",
//     creatorName: "J.R.R.Tolkein",
//     avatarSrc:
//       "https://mocah.org/uploads/posts/4589245-gandalf-wizard-low-poly-pipes-the-lord-of-the-rings-fantasy-art-artwork.jpg",
//     listens: "434K",
//     uploadTime: "7 days ago",
//   },
//   {
//     imgSrc:
//       "https://images-na.ssl-images-amazon.com/images/I/91YH0ZtB9XL.jpg",
//     title: "Harry Potter and the Half-Blood Prince",
//     creatorName: "J.K.Rowling",
//     channelName: "Fantasy Audiobooks",
//     avatarSrc: "https://avatarfiles.alphacoders.com/172/thumb-172065.jpg",
//     listens: "3.2M",
//     uploadTime: "2 years ago",
//   },
//   {
//     imgSrc:
//       "https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg",
//     title: "Perfect",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - ÷",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "15M",
//     uploadTime: "3 years ago",
//   },
//   {
//     imgSrc:
//       "https://m.media-amazon.com/images/M/MV5BMmZlNmVmNGItM2RmOS00ZTE3LTk2M2QtNWY0ZmQ2NGZlOGRiXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_.jpg",
//     title: "Cosmic Queries - Edge of the Universe",
//     channelName: "StarTalk",
//     creatorName: "With Neil Degrasse Tyson and Chuck Nice",
//     avatarSrc:
//       "https://i1.sndcdn.com/avatars-yHXC7ACv50JD3AIz-st2Vqg-t240x240.jpg",
//     listens: "600K",
//     uploadTime: "7 months",
//   },
//   {
//     imgSrc:
//       "https://i.pinimg.com/736x/d1/0f/6e/d10f6eba68fcbf7fc1cd4ffd4e7eef3d.jpg",
//     title: "Thinking Out Loud",
//     channelName: "Ed Sheeran",
//     creatorName: "Ed Sheeran - +",
//     avatarSrc:
//       "https://c-sf.smule.com/rs-s23/arr/c1/b9/9c411e50-9fe9-464f-8060-a08912471543_256.jpg",
//     listens: "70M",
//     uploadTime: "7 years ago",
//   },
//   {
//     imgSrc:
//       "https://img1.od-cdn.com/ImageType-400/0874-1/9CC/781/EA/%7B9CC781EA-2F1E-4F19-A8F7-C522DB48E31C%7DImg400.jpg",
//     title: "The Fellowship of the Ring - Lord of the Rings Part I",
//     channelName: "Tolkeinverse",
//     creatorName: "J.R.R.Tolkein",
//     avatarSrc:
//       "https://mocah.org/uploads/posts/4589245-gandalf-wizard-low-poly-pipes-the-lord-of-the-rings-fantasy-art-artwork.jpg",
//     listens: "434K",
//     uploadTime: "7 days ago",
//   },
// ];
