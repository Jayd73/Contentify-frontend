import React from "react";
import PostCard from "../cards/PostCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "0.5rem",
  },
});

const PostContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PostCard
        avatarSrc="https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png"
        uname="React js"
        date="July 15, 2019"
        text="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."
        loggedInUname="JayD"
      />
      <PostCard
        avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
        uname="Python.Org"
        date="March 09, 2018"
        text="Whether you're new to programming or an experienced developer, it's easy to learn and use Python."
        loggedInUname="JayD"
      />
      <PostCard
        avatarSrc="https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png"
        uname="React js"
        date="August 22, 2019"
        imgSrc="https://reactjs.org/logo-og.png"
        text="Here to make your life easier !"
        loggedInUname="JayD"
      />
      <PostCard
        avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
        uname="National Geographic"
        date="August 22, 2019"
        imgSrc="http://prod-upp-image-read.ft.com/4fbc3aec-a862-11e3-8ce1-00144feab7de"
        text="You. Me. Everyone. We are made of start stuff."
        loggedInUname="JayD"
      />
    </div>
  );
};

export default PostContainer;
