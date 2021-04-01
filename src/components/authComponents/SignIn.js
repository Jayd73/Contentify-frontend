import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserState } from "../../contexts/UserContext";
import axiosInstance from "../../axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

var urljoin = require("url-join");

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    // margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0.5em",
    marginBottom: "-0.5em",
    paddingRight: "1.5em",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [userState, setUserState] = useUserState();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const errorMessages = {
    username: "",
    password: "",
    invalidCred: "",
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState(errorMessages);
  const [showPassword, setshowPassword] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    axiosInstance
      .post(`token/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        axiosInstance
          .get(`channel/curruser/`)
          .then((res) => {
            // console.log(res.data);

            setUserState({
              ...userState,
              userID: res.data.user.id,
              username: res.data.user.username,
              email: res.data.user.email,
              userAvatar: res.data.avatar.startsWith("http")
                ? res.data.avatar
                : urljoin(userState.serverBaseURL, res.data.avatar),
              channelBanner: res.data.banner.startsWith("http")
                ? res.data.banner
                : urljoin(userState.serverBaseURL, res.data.banner),
              createdAt: res.data.created_date,
              channelID: res.data.id,
              channelCreatedDate: res.data.created_date,

              channelAbout: res.data.about,
              followers: res.data.followers,
            });
            // console.log(JSON.stringify(res.data));
          })
          .catch((error) => {
            console.log("Error from API: ", error);
          });

        history.push("/videos");
      })
      .catch((errors) => {
        // console.log("Error when Login: ", errors.response.data);
        const unameErr = errors.response.data["username"];
        const passwdErr = errors.response.data["password"];
        const invalidCredErr = errors.response.data["detail"];

        setFieldErrors({
          ...fieldErrors,
          username: unameErr ? unameErr[0] : "",
          password: passwdErr ? passwdErr[0] : "",
          invalidCred: invalidCredErr ? invalidCredErr : "",
        });
      });
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        paddingBottom: "1em",
        paddingTop: "0.5em",
        paddingInline: "2em",
        marginBottom: "8em",
      }}
    >
      <CssBaseline />
      <div className={classes.title}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginLeft: "0.2em", color: "black", fontSize: "2em" }}
        >
          Sign In
        </Typography>
      </div>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            helperText={fieldErrors.username}
            error={fieldErrors.username ? true : false}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            helperText={fieldErrors.password}
            error={fieldErrors.password ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          {fieldErrors.invalidCred ? (
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "red", fontSize: "1.5em" }}
            >
              Invalid credentials
            </Typography>
          ) : (
            ""
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ height: "3em" }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <Grid container style={{ marginTop: "0.5em" }}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

{
  /* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */
}
