import axios from "axios";
import { toast } from "react-toastify";

export const httpService = axios.create({});

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error("Something went wrong!", {
      className: "warn-toast",
    });
    throw new Error(error.response.data.message);
  }
);

export default httpService;
