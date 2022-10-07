import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWrapper } from "../utils/fetchWrapper";
import { JOBS_API } from "../constants";

const initialState = {
  jobs: [],
};

export const getJobs = createAsyncThunk("jobs/get", async () => {
  const res = await fetchWrapper.get(JOBS_API);
  return res;
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: {
    [getJobs.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
// export const { } = jobsSlice.actions;

export default jobsSlice.reducer;
