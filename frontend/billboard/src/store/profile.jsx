import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../utils/axios";

export const follow = createAsyncThunk(
  "profile/follow",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await httpClient.post("/followes", {
        fromUserId: data.fromUserId, //내 아이디
        toUserId: data.toUserId, //상대방 아이디
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const followdelete = createAsyncThunk(
  "profile/followdelete",
  async (del, { rejectWithValue }) => {
    try {
      const response = await httpClient.delete("/followes", {
        data: {
          fromUserId: del.fromUserId,
          toUserId: del.toUserId,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//프로필 페이지 조회
export const userProfile = createAsyncThunk(
  "profile/userProfile",
  async (userId) => {
    try {
      const response = await httpClient.get(`users/${userId}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

//유저가 팔로우한 목록 조회
export const iFollowYou = createAsyncThunk(
  "profile/iFollowYou",
  async (userId) => {
    try {
      const response = await httpClient.get(`followes/from/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

//유저를 팔로잉중인 목록 조회
export const YouFollowMe = createAsyncThunk(
  "profile/YouFollowMe",
  async (userId) => {
    try {
      const response = await httpClient.get(`followes/to/${userId}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
// const initialState = {};
// const profileSlice = createSlice({
//   name: "reserve",
//   initialState,
//   reducers: {
//     // reservereducers:(state, action) => {
//     // ...
//     // }
//   },
//   extraReducers: (builder) => {},
// });

// export default profileSlice.reducer;
// export const {
//   //   profilereducers
// } = profileSlice.actions;
// export const selectRserve = (state) => state.user;
