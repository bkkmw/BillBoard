import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../utils/axios";

export const follow = createAsyncThunk(
  "profile/follow",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("/followes", {
        fromUserId: data.fromUserId,
        toUserId: data.toUserId,
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
