import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../slices/jobs";
import viewReducer from "../slices/view";
import authReducer from "../slices/auth";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    view: viewReducer,
    auth: authReducer,
  },
});

export default store;
