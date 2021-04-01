import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import VideoCard from "../cards/VideoCard";

const useStyles = makeStyles({
  gridContainer: {
    marginLeft: "0.5rem",
  },
});

const VideoContainer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer} spacing={1}>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely Raven more meaninglittle december dirges from the my ominous sad from. Now from the with darkness more a, spoken i the of take minute above tell the tapping. Nothing repeating."
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://s3.amazonaws.com/files.dezyre.com/images/Why+you+should+learn+machine+learning%3F/Learn+Machine+Learning.png"
          title="Importance of ML"
          channelName="Machine Learning"
          avatarSrc="https://image.freepik.com/free-vector/ai-artificial-intelligence-logo-hands-artificial-intelligence-machine-learning-concept-sphere-grid-wave-with-binary-code_127544-18.jpg"
          views="7.7M"
          timeAgo="9 months ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://s3.amazonaws.com/files.dezyre.com/images/Why+you+should+learn+machine+learning%3F/Learn+Machine+Learning.png"
          title="Importance of ML"
          channelName="Machine Learning"
          avatarSrc="https://image.freepik.com/free-vector/ai-artificial-intelligence-logo-hands-artificial-intelligence-machine-learning-concept-sphere-grid-wave-with-binary-code_127544-18.jpg"
          views="7.7M"
          timeAgo="9 months ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely "
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely "
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
    </Grid>
  );
};

export default VideoContainer;
