import React from "react";
import PostCard from "../cards/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import { useUserState } from "../../contexts/UserContext";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

let dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "0.5rem",
  },
  message: {
    textAlign: "center",
    margin: "2em",
    fontSize: "2em",
    color: theme.palette.appBg.darkest,
  },
}));

const PostContainer = (props) => {
  const allPosts = props.location && props.location.state;
  const userPosts = props.userPosts;
  const classes = useStyles();
  const [userState, setUserState] = useUserState();
  const [deletedPosts, setDeletedPosts] = React.useState(0);

  // React.useEffect(() => {
  //   console.log("Recieved all\n: ", allPosts);
  //   console.log("Recieved user: ", userPosts);
  // }, []);

  const userPostsCards = (postsList) =>
    postsList.map((userPost) => (
      <PostCard
        key={userPost.id}
        avatarSrc={userPost.channel.avatar}
        imgSrc={userPost.image}
        uname={userPost.channel.user.username}
        date={dayjs(userPost.published).format("hh:mm a, MMMM DD, YYYY")}
        text={userPost.content}
        isLoggedInUser={userState.moreChannelData.id == userPost.channel.id}
        userPostID={userPost.id}
        userPostChannelSlug={userPost.channel.slug}
        userPostSlug={userPost.slug}
        deletedPosts={deletedPosts}
        setDeletedPosts={setDeletedPosts}
      />
    ));

  if (allPosts) {
    return (
      <div style={{ marginTop: "4.5em" }} className={classes.container}>
        {userPostsCards(allPosts)}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      {userPosts && userPosts.length > 0 && deletedPosts != userPosts.length ? (
        userPostsCards(userPosts)
      ) : (
        <Typography className={classes.message}>
          There are no posts on this channel
        </Typography>

        // <>
        //   <PostCard
        //     avatarSrc="https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png"
        //     uname="React js"
        //     date="July 15, 2019"
        //     text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."
        //     loggedInUname="JayD"
        //   />
        //   <PostCard
        //     avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
        //     uname="Python.Org"
        //     date="March 09, 2018"
        //     text="Whether you're new to programming or an experienced developer, it's easy to learn and use Python."
        //     loggedInUname="JayD"
        //   />
        //   <PostCard
        //     avatarSrc="https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png"
        //     uname="React js"
        //     date="August 22, 2019"
        //     imgSrc="https://reactjs.org/logo-og.png"
        //     text="Here to make your life easier !"
        //     loggedInUname="JayD"
        //   />
        //   <PostCard
        //     avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
        //     uname="National Geographic"
        //     date="August 22, 2019"
        //     imgSrc="http://prod-upp-image-read.ft.com/4fbc3aec-a862-11e3-8ce1-00144feab7de"
        //     text="You. Me. Everyone. We are made of start stuff."
        //     loggedInUname="JayD"
        //   />
        // </>
      )}
    </div>
  );
};

export default withRouter(PostContainer);
