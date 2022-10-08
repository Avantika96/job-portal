import React, { createContext } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {
  const currentUser = useSelector((state) => state.currentUser);
  const { userType } = currentUser;
  const isFreelancer = userType === "freelancer" ? true : false;

  return <Provider value={{ isFreelancer }}>{props.children}</Provider>;
};
