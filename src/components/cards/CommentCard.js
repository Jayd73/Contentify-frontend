import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

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
}));

const CommentCard = ({ avatarSrc, uname, timeAgo, text }) => {
  const classes = useStyles();
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(Math.floor(Math.random() * 10));
  const postingTime = timeAgo + " ago";

  const toggleLike = () => {
    setLiked(!liked);
    if (liked) setLikes(likes - 1);
    else setLikes(likes + 1);
  };

  return (
    <Card className={classes.root} variant="outlined" raised={false}>
      <CardHeader
        style={{ marginLeft: "-0.8em" }}
        avatar={<Avatar src={avatarSrc} />}
        title={uname}
        subheader={postingTime}
      />
      <div
        style={{
          marginTop: "-1.3em",
          marginLeft: "2.7em",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: "1em" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {text}
          </Typography>
        </CardContent>

        <CardActions disableSpacing style={{ marginTop: "-1em" }}>
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
