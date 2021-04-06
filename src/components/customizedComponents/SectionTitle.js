import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
    borderBottom: `2px solid ${theme.palette.appBg.darkest}`,
    backgroundColor: theme.palette.appBg.darker,
  },
}));

function SectionTitle({
  title,
  btnText,
  EndIcon,
  showForm,
  setShowForm,
  canEdit,
}) {
  const headingRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    window.scrollTo(
      0,
      headingRef.current.getBoundingClientRect().top -
        theme.mixins.toolbar.minHeight
    );
  }, []);

  return (
    <div ref={headingRef} className={classes.heading}>
      <h1>{title}</h1>
      {canEdit ? (
        <Button
          style={{ height: "3em", marginRight: "2em" }}
          variant="contained"
          color="primary"
          endIcon={<EndIcon />}
          disabled={showForm}
          onClick={() => setShowForm(true)}
        >
          {btnText}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default SectionTitle;
