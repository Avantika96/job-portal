import httpService from "./httpService";
import { GITHUB_API } from "../constants";
import { toast } from "react-toastify";

const getGithubRepos = (username) => {
  return httpService.get(GITHUB_API + `/${username}/repos`).catch(() => {
    toast.error("Please check your github username!", {
      className: "warn-toast",
    });
  });
};

const userService = {
  getGithubRepos,
};

export default userService;
