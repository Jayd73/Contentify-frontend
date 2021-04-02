import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0.5),
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

  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const errorMessages = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(errorMessages);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      setFieldErrors({
        ...fieldErrors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }
    // console.log(formData);

    axiosInstance
      .post(`user/create/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        history.push("/signin");
        // console.log("Response: ", res);
        // console.log("Response data: ", res.data);
      })
      .catch((errors) => {
        // console.log("Error from API: ", errors.response.data);
        const unameErr = errors.response.data["username"];
        const emailErr = errors.response.data["email"];
        const passwdErr = errors.response.data["password"];

        setFieldErrors({
          ...fieldErrors,
          username: unameErr ? unameErr[0] : "",
          email: emailErr ? emailErr[0] : "",
          password: passwdErr ? passwdErr[0] : "",
        });
      });
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        margin: 0,
        backgroundColor: "white",
        borderRadius: "20px",
        paddingBottom: "1em",
        paddingTop: "0.5em",
        paddingInline: "2em",
        marginTop: "3em",
        // border: "2px solid green",
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
          Sign up
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
            autoFocus
            helperText={fieldErrors.username}
            error={fieldErrors.username ? true : false}
            onChange={handleChange}
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
            onChange={handleChange}
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
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            helperText={fieldErrors.confirmPassword}
            error={fieldErrors.confirmPassword ? true : false}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            id="email"
            helperText={fieldErrors.email}
            error={fieldErrors.email ? true : false}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ height: "3em" }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
