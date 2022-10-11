import httpService from "./httpService";
import { USERS_API } from "../constants";
import { toast } from "react-toastify";

const register = (payload) => {
  return httpService
    .post(USERS_API, payload)
    .then(() => (window.location.href = "/login"));
};

const updateUserDetails = ({ id, payload }) => {
  return httpService.put(USERS_API + `/${id}`, payload).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
  });
};

const login = ({ username, password }) => {
  return httpService
    .get(USERS_API + `?username=${username}`)
    .then((response) => {
      if (response.data[0].password === password) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        window.location.href = "/";
      } else {
        toast.error("Password is incorrect", {
          className: "warn-toast",
        });
      }

      return response.data;
    })
    .catch(() => {
      toast.error("Username or password is incorrect", {
        className: "warn-toast",
      });
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const authService = {
  register,
  login,
  logout,
  updateUserDetails,
};

export default authService;
