import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroBackground: {
    background: 'url("/images/hero_section_img.png") no-repeat center',
    backgroundSize: 1900,
    height: `${window.innerHeight}px`,
    width: `${window.innerWidth}px`,
    // border: "1px solid red",
  },
  heroOverlay: {
    background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4))",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  heroContent: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "3px solid yellow",
  },
  logo: {
    height: "4em",
  },
}));

function HeroSection({ HeroContent }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.heroBackground}>
      <div className={classes.heroOverlay}>
        <AppBar
          style={{
            padding: "10px",
            justifyContent: "center",
          }}
          position="fixed"
          color="transparent"
          elevation={0}
        >
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <img
                  className={classes.logo}
                  src="/images/contentify-logo-v4.png"
                  alt="Contentify"
                  onClick={() => history.push("/")}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ right: "1.5em", top: "1em" }}
                  onClick={() => history.push("/signin")}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ top: "1em" }}
                  onClick={() => history.push("/signup")}
                >
                  Create an account
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.heroContent}>
          <HeroContent />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
