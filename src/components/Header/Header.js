import React, { useContext } from "react";
import { useSelector } from "react-redux";
import s from "./Header.module.scss";
import { freelancerTabs, employerTabs } from "./config";
import { AppContext } from "../../AppContext";
import { Button } from "../";

const Header = () => {
  const pageView = useSelector((state) => state.view);
  const { pageTitle } = pageView;
  const { isFreelancer } = useContext(AppContext);
  const tabList = isFreelancer ? freelancerTabs : employerTabs;

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
            customStyle={{ margin: "30px" }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
