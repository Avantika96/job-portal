import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return children;
};

export default PrivateRoute;
