import httpService from "./httpService";
import { USERS_API } from "../constants";

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

const getUser = (id) => {
  return httpService.get(USERS_API + `/${id}`);
};

const login = ({ username, password }) => {
  return httpService
    .get(USERS_API + `?username=${username}`)
    .then((response) => {
      if (response.data[0].password === password) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        window.location.href = "/";
      }

      return response.data;
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
  getUser,
};

export default authService;
