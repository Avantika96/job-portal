import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Header.module.scss";
import { freelancerTabs, employerTabs } from "./config";
import { AppContext } from "../../AppContext";
import { Button } from "../";
import { logout } from "../../slices/auth";

const Header = () => {
  const pageView = useSelector((state) => state.view);
  const dispatch = useDispatch();
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
            customStyle={{ margin: "20px" }}
          />
        ))}
        <Button
          text="Logout"
          handleClick={() => dispatch(logout())}
          customStyle={{ margin: "20px" }}
        />
      </div>
    </header>
  );
};

export default Header;
