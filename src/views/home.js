import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../slices/view";

const Home = () => {
  const user = useSelector((state) => state.currentUser);
  const { userType } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(userType === "freelancer" ? "Profile" : "New Job"));
  }, [dispatch, userType]);

  return <h1>Home</h1>;
};

export default Home;
