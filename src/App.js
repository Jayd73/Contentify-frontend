import "./App.css";
import HeroSection from "./components/hero/HeroSection";
import HeroMessage from "./components/hero/HeroMessage";
import SignUp from "./components/authComponents/SignUp";
import SignIn from "./components/authComponents/SignIn";
import Logout from "./components/authComponents/Logout";

import MainApp from "./components/mainApp/MainApp";
import VideoContainer from "./components/mainContainer/VideoContainer";
import PostContainer from "./components/mainContainer/PostContainer";
import AudioContainer from "./components/mainContainer/AudioContainer";
import ChannelContainer from "./components/mainContainer/ChannelContainer";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <HeroSection HeroContent={HeroMessage} />}
        />
        <Route
          exact
          path="/signup"
          component={() => <HeroSection HeroContent={SignUp} />}
        />
        <Route
          exact
          path="/signin"
          component={() => <HeroSection HeroContent={SignIn} />}
        />
        <Route exact path="/logout" component={Logout} />
        <Route
          exact
          from="/videos"
          component={() => <MainApp ChildComponent={VideoContainer} />}
        />
        <Route
          exact
          from="/audios"
          component={() => <MainApp ChildComponent={AudioContainer} />}
        />
        <Route
          exact
          from="/posts"
          component={() => <MainApp ChildComponent={PostContainer} />}
        />
        <Route
          exact
          from="/channel/cname"
          component={() => <MainApp ChildComponent={ChannelContainer} />}
        />
      </Switch>
    </>
  );
}

export default App;
