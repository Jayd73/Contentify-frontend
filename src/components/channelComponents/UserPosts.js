import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import CreatePostForm from "./CreatePostForm";
import { Create } from "@material-ui/icons";
import PostContainer from "../mainContainer/PostContainer";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.secondary.dark,
    position: "sticky",
    top: theme.mixins.toolbar.minHeight,
    fontSize: "1em",
    fontWeight: "bold",
    padding: "1em",
    paddingLeft: "2em",
    borderTop: `2px solid ${theme.palette.appBg.darkest}`,
    borderBottom: `2px solid ${theme.palette.appBg.darkest}`,
    backgroundColor: theme.palette.appBg.darker,
  },
  postsContainer: {
    margin: 0,
    height: window.innerHeight - 140,
    overflowY: "auto",
    // border: "2px solid blue",
  },
}));

function UserPosts({ editable }) {
  const theme = useTheme();
  const classes = useStyles();
  const [showCreatePostForm, setShowCreatePostForm] = React.useState(false);
  const headingRef = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(
      0,
      headingRef.current.getBoundingClientRect().top -
        theme.mixins.toolbar.minHeight
    );
  }, []);

  return (
    <div>
      <div ref={headingRef} className={classes.heading}>
        <h1>Posts 📃 </h1>
        {editable ? (
          <Button
            style={{ height: "3em", marginRight: "2em" }}
            variant="contained"
            color="primary"
            endIcon={<Create />}
            disabled={showCreatePostForm}
            onClick={() => setShowCreatePostForm(true)}
          >
            Create new
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className={classes.postsContainer}>
        {showCreatePostForm ? (
          <CreatePostForm setShowForm={setShowCreatePostForm} />
        ) : (
          <PostContainer />
        )}
      </div>
    </div>
  );
}

export default UserPosts;
