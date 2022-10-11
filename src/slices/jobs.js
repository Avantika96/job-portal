import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobsService from "../services/jobsService";

const initialState = [];

export const getJobs = createAsyncThunk("jobs/getAll", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, userType } = user;
  const params = userType === "employer" ? `employerId=${id}` : "";
  const res = await JobsService.getJobs(params);
  return res.data;
});

export const getJobsByPage = createAsyncThunk(
  "jobs/getJobsByPage",
  async (page) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id, userType } = user;
    const params = userType === "employer" ? `employerId=${id}` : "";
    const res = await JobsService.getJobsByPage(page, params);
    return res.data;
  }
);

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
      return [...action.payload].reverse();
    },
    [applyToJob.fulfilled]: (state, action) => {
      if (state.length > 0) {
        const index = state.findIndex((job) => job.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      }
      window.location.reload();
    },
    [addJob.fulfilled]: (state, action) => {
      state.push(action.payload);
      window.location.reload();
    },
    [getJobsByPage.fulfilled]: (state, action) => {
      // state.push(...action.payload);
      // return state;
      state = [...state, ...action.payload];
    },
  },
});

export default jobsSlice.reducer;
