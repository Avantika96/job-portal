import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { THEME_VARIABLES } from "./constants/theme";

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const { user } = useSelector((state) => state.auth);
  const { userType } = user || {};
  const isFreelancer = userType === "freelancer" ? true : false;

  useEffect(() => {
    setCSSVariables(THEME_VARIABLES.light);
  }, []);

  const setCSSVariables = (theme) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setCSSVariables(THEME_VARIABLES.light);
    } else {
      setTheme("dark");
      setCSSVariables(THEME_VARIABLES.dark);
    }
  };

  return (
    <Provider value={{ isFreelancer, theme, toggleTheme }}>
      {props.children}
    </Provider>
  );
};
