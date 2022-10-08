import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWrapper } from "../utils/fetchWrapper";
import { JOBS_API } from "../constants";

const initialState = {
  jobs: [],
};

export const getJobs = createAsyncThunk("jobs/getAll", async () => {
  const res = await fetchWrapper.get(JOBS_API);
  return res;
});

export const getJobById = createAsyncThunk("jobs/jobById", async (jobId) => {
  const res = await fetchWrapper.get(JOBS_API + `/${jobId}`);
  return res;
});

export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async ({ jobId, payload }) => {
    const res = await fetchWrapper.put(JOBS_API + `/${jobId}`, payload);
    return res;
  }
);

export const addJob = createAsyncThunk("jobs/addJob", async (payload) => {
  const res = await fetchWrapper.post(JOBS_API, payload);
  return res;
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

// Action creators are generated for each case reducer function
// export const { } = jobsSlice.actions;

export default jobsSlice.reducer;
