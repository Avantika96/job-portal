import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageTitle: "",
  isLoading: false,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { setTitle } = viewSlice.actions;

export default viewSlice.reducer;
