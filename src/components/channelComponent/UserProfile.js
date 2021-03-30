import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1em 2.5em",
  },

  heading: {
    color: theme.palette.secondary.dark,
    display: "flex",
    // borderTop: `solid 2px ${theme.palette.secondary.dark}`,
    // borderBottom: `solid 2px ${theme.palette.secondary.dark}`,
  },
  textContent: {
    fontSize: "1.2em",
    marginTop: "0.5em",
  },
}));

function UserProfile() {
  const classes = useStyles();
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState(
    "Quaint head unto my be shrieked open, liftednevermore remember gently door my the stopped lore nights. Hath grim forgiveness hear. Stronger my the of nevermore dreary whom oer still name heart, distant seeing"
  );
  const isLoggedUser = true;
  const handleClick = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <h1>About</h1>
        {isLoggedUser ? (
          <IconButton
            style={{ marginTop: "-0.2em", marginLeft: "0.5em" }}
            onClick={handleClick}
          >
            <EditIcon color="primary" />
          </IconButton>
        ) : (
          ""
        )}
      </div>
      {isEditingAbout ? (
        <ClickAwayListener onClickAway={() => setIsEditingAbout(false)}>
          <TextField
            variant="outlined"
            multiline
            size="small"
            name="searchbox"
            type="text"
            id="about"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            style={{ width: "100%" }}
          />
        </ClickAwayListener>
      ) : (
        <div className={classes.textContent}>{aboutText}</div>
      )}
    </div>
  );
}

export default UserProfile;
