import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../slices/currentUser";
import jobsReducer from "../slices/jobs";
import viewReducer from "../slices/view";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    jobs: jobsReducer,
    view: viewReducer,
  },
});

export default store;
