import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "freelancer",
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export const {} = currentUserSlice.actions;

export default currentUserSlice.reducer;
