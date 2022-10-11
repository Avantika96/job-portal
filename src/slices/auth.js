import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk("auth/register", async (payload) => {
  return await AuthService.register(payload);
});

export const updateUser = createAsyncThunk("auth/updateUser", async (data) => {
  const response = await AuthService.updateUserDetails(data);
  return response;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  const data = await AuthService.login(payload);
  return { user: data };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

const { reducer } = authSlice;
export default reducer;
