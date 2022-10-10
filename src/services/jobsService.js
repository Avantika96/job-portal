import httpService from "./httpService";
import { JOBS_API } from "../constants";

const getJobs = (params) => {
  let api = JOBS_API;
  if (params) {
    api = api + `?${params}`;
  }
  return httpService.get(api);
};

const getJobById = (jobId) => {
  return httpService.get(JOBS_API + `/${jobId}`);
};

const getJobsByPage = (page, params) => {
  return httpService.get(JOBS_API + `?_page=${page}&_limit=10&${params}`);
};

const applyToJob = ({ jobId, payload }) => {
  return httpService.put(JOBS_API + `/${jobId}`, payload);
};

const addJob = (payload) => {
  return httpService.post(JOBS_API, payload);
};

const jobsService = {
  getJobs,
  getJobById,
  applyToJob,
  addJob,
  getJobsByPage,
};

export default jobsService;
