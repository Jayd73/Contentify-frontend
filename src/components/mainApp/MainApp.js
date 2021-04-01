import React from "react";
import MainAppbar from "../appbar/MainAppbar";
import "./MainApp.css";

function MainApp({ ChildComponent }) {
  return (
    <div>
      <MainAppbar />
      <div style={{ marginTop: "4.2em" }}>
        <ChildComponent />
      </div>
    </div>
  );
}

export default MainApp;
