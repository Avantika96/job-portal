import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../slices/view";
import { AppContext } from "../../AppContext";
import UserDetails from "../Forms/UserDetails";
import NewJob from "../Forms/NewJob";

const Home = () => {
  const { isFreelancer } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(isFreelancer ? "Profile" : "New Job"));
  }, [dispatch, isFreelancer]);

  return isFreelancer ? <UserDetails /> : <NewJob />;
};

export default Home;
