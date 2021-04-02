import React from "react";

function HeroMessage() {
  const heroFont = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  };

  return (
    <div
      style={{
        width: "65%",
        fontSize: "2em",
      }}
    >
      <center style={heroFont}>
        <h1 style={heroFont}>Get a whole new content experience</h1>
        <br />
        Introducing Contentify - A platform for streaming multimedia
      </center>
    </div>
  );
}

export default HeroMessage;
