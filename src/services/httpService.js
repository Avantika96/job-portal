import axios from "axios";
import { toast } from "react-toastify";

export const httpService = axios.create({});

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.message);
    toast.error("Something went wrong!", {
      className: "warn-toast",
    });
  }
);

export default httpService;
