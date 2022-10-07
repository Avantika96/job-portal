import React from "react";
import { useSelector } from "react-redux";
import s from "./Header.module.scss";
import { freelancerTabs, employerTabs } from "./config";
import { Button } from "../";

const Header = () => {
  const user = useSelector((state) => state.currentUser);
  const pageView = useSelector((state) => state.view);
  const { userType } = user;
  const { pageTitle } = pageView;
  const tabList = userType === "freelancer" ? freelancerTabs : employerTabs;
  return (
    <header className={s.header}>
      <h1>{pageTitle || "Job Portal"}</h1>
      <div>
        {tabList.map((item) => (
          <Button
            {...item}
            handleClick={(url) => {
              window.location.href = url;
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
