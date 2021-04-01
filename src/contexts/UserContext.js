import React, { useState, useContext, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userState, setUserState] = useState({
    userID: 0,
    username: "",
    email: "",
    userAvatar: "",
    createdAt: "",
    channelID: "",
    channelCreatedDate: "",
    channelBanner: "",
    channelAbout: "",
    followers: 0,
    serverBaseURL: "http:/127.0.0.1:8000",
  });

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUserState(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userState));
  }, [userState]);

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useUserState() {
  return useContext(UserContext);
}
