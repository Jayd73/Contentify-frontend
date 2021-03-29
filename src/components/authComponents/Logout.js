import React, { useEffect } from "react";
import axiosInstance from "../../axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function SignUp() {
  const history = useHistory();

  useEffect(() => {
    axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/signin");
  });
  return (
    <div>
      <center>
        <Typography
          component="h1"
          variant="h5"
          style={{
            marginTop: "2em",
            color: "black",
            fontSize: "6em",
            fontWeight: "bolder",
          }}
        >
          Logging out...
        </Typography>
      </center>
    </div>
  );
}
