import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { PURGE } from "redux-persist";

import httpClient from "../utils/axios";

// actions
// 로그인
export const doLogin = createAsyncThunk(
  "userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/users/login", {
        userId: userData.userId,
        password: userData.password,
      });
      // console.log("dsajkl", response);
      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  login: false,

  loginUser: {
    userId: "",
    nickName: "",
    email: "",
    experience: -1,
    matchCount: -1,
    winCount: -1,
    accessToken: "",
    refreshToken: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.loginUser.accessToken = action.payload;
      // console.log(state.loginUser.accessToken);
    },
    clearUserInfo: (state) => {
      state.loginUser.refreshToken = "";
      // console.log("CLEARED");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {});
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.login = true;
      state.loginUser.nickName = action.payload.data.userInfo.nickname;
      state.loginUser.userId = action.payload.data.userInfo.userId;
      state.loginUser.email = action.payload.data.userInfo.email;
      state.loginUser.experience = action.payload.data.userInfo.experience;
      state.loginUser.userId = action.payload.data.userInfo.userId;
      state.loginUser.matchCount = action.payload.data.userInfo.matchCount;
      state.loginUser.winCount = action.payload.data.userInfo.winCount;
      state.loginUser.accessToken = action.payload.data.accessToken;
      state.loginUser.refreshToken = action.payload.data.refreshToken;
      // console.log("hi", action.payload.userInfo);
    });
    builder.addCase(doLogin.rejected, (state) => {});
    builder.addCase(PURGE, () => {
      initialState;
      // console.log("gkdls", initialState);
    });
  },
});

export default userSlice.reducer;
export const { setUserId, updateToken, clearUserInfo } = userSlice.actions;
export const selectUser = (state) => state.user;
