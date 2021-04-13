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

import UserProfile from "./components/channelComponents/UserProfile";
import UserPosts from "./components/channelComponents/UserPosts";
import UserVideos from "./components/channelComponents/UserVideos";
import UserAudios from "./components/channelComponents/UserAudios";
import UserAnalytics from "./components/channelComponents/UserAnalytics";
import UserFollowing from "./components/channelComponents/UserFollowing";

import PlayingInterface from "./components/mainInterface/PlayingInterface";

import SearchHandler from "./components/miscellaneous/SearchHandler";

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
          from="/channel/:channelSlug"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserProfile} />
              )}
            />
          )}
        />

        <Route
          exact
          from="/channel/:channelSlug/posts"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserPosts} />
              )}
            />
          )}
        />
        <Route
          exact
          from="/channel/:channelSlug/videos"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserVideos} />
              )}
            />
          )}
        />
        <Route
          exact
          from="/channel/:channelSlug/audios"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserAudios} />
              )}
            />
          )}
        />
        <Route
          exact
          from="/channel/:channelSlug/posts/:userPostSlug"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserPosts} />
              )}
            />
          )}
        />
        <Route
          exact
          from="/channel/:channelSlug/analytics"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserAnalytics} />
              )}
            />
          )}
        />

        <Route
          exact
          from="/channel/:channelSlug/following"
          component={() => (
            <MainApp
              ChildComponent={() => (
                <ChannelContainer ChildComponent={UserFollowing} />
              )}
            />
          )}
        />

        <Route
          exact
          from="/channel/:channelSlug/:mediaType/:mediaSlug"
          component={() => <MainApp ChildComponent={PlayingInterface} />}
        />

        <Route
          exact
          from="/search/:filterValue/"
          component={() => <MainApp ChildComponent={SearchHandler} />}
        />
      </Switch>
    </>
  );
}

export default App;
