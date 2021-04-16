import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { UserContextProvider } from "./contexts/UserContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#233044",
      textColor: "#eeeee9",
      iconColor: "#878e98",
      bright: "#004fcf",
    },
    appBg: {
      light: "#fafafa",
      dark: "#f2f2f2",
      darker: "#ebebeb",
      darkest: "#666666",
      silver: "#878e98",
    },
  },
  typography: {
    // fontFamily:
    //   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontFamily: "'Noto Sans JP', sans-serif",
  },
});

ReactDOM.render(
  <Router>
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </Router>,
  document.getElementById("root")
);
