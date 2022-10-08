import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   id: "f9",
//   name: "Abdul",
//   userType: "freelancer",
// };

const initialState = {
  id: "e1",
  name: "Akshay Saxena",
  userType: "employer",
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export const {} = currentUserSlice.actions;

export default currentUserSlice.reducer;
