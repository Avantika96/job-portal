import React, { createContext } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { userType } = user || {};
  const isFreelancer = userType === "freelancer" ? true : false;

  return <Provider value={{ isFreelancer }}>{props.children}</Provider>;
};
