import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobsService from "../services/jobsService";

const initialState = {
  fetchingJobs: false,
  jobs: [],
};

export const getJobs = createAsyncThunk("jobs/getAll", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, userType } = user;
  const params = userType === "employer" ? `employerId=${id}` : "";
  const res = await JobsService.getJobs(params);
  return res.data;
});

export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async ({ jobId, payload }) => {
    const res = await JobsService.applyToJob({ jobId, payload });
    return res.data;
  }
);

export const addJob = createAsyncThunk("jobs/addJob", async (payload) => {
  const res = JobsService.addJob(payload);
  return res;
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: {
    [getJobs.pending]: (state, action) => {
      state.fetchingJobs = true;
      state.jobs = [];
    },
    [getJobs.fulfilled]: (state, action) => {
      state.fetchingJobs = false;
      state.jobs = [...action.payload].reverse();
      // return [...action.payload].reverse();
    },
    [applyToJob.fulfilled]: (state, action) => {
      if (state.jobs.length > 0) {
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[index] = {
          ...state.jobs[index],
          ...action.payload,
        };
      }
      window.location.reload();
    },
    [addJob.fulfilled]: (state, action) => {
      state.jobs.push(action.payload);
      window.location.reload();
    },
  },
});

export default jobsSlice.reducer;
