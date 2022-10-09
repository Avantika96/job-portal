import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobsService from "../services/jobsService";

const initialState = {
  jobs: [],
};

export const getJobs = createAsyncThunk("jobs/getAll", async () => {
  const res = await JobsService.getJobs();
  return res.data;
});

export const getJobById = createAsyncThunk("jobs/jobById", async (jobId) => {
  const res = await JobsService.getJobById(jobId);
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
  return res.data;
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: {
    [getJobs.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [getJobById.fulfilled]: (state, action) => {
      return [action.payload];
    },
    [applyToJob.fulfilled]: (state, action) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      state.jobs[index] = {
        ...state.jobs[index],
        ...action.payload,
      };
    },
    [addJob.fulfilled]: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});

export default jobsSlice.reducer;
