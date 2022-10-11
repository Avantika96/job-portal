import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import s from "./Header.module.scss";
import { freelancerTabs, employerTabs } from "./config";
import { AppContext } from "../../AppContext";
import { Button } from "../";
import { logout } from "../../slices/auth";

const Header = () => {
  const pageView = useSelector((state) => state.view);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageTitle } = pageView;
  const { isFreelancer, theme, toggleTheme } = useContext(AppContext);
  const tabList = isFreelancer ? freelancerTabs : employerTabs;

  return (
    <header className={s.header}>
      <h1>{pageTitle || "Job Portal"}</h1>
      <div>
        {tabList.map((item, index) => (
          <Button
            {...item}
            key={index}
            handleClick={(url) => {
              navigate(url);
            }}
          />
        ))}
        <Button text="Logout" handleClick={() => dispatch(logout())} />
        <Button
          text={theme === "light" ? "Dark Theme" : "Light Theme"}
          handleClick={() => toggleTheme()}
        />
      </div>
    </header>
  );
};

export default Header;
