import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../utils/axios";

// 보드게임 조건 조회(검색)
export const getBoardGames = createAsyncThunk(
  "boardgames/getBoardGames",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpClient.post("boardgames/condition", {
        name: data.name,
        maxplaytime: data.maxplaytime,
        maxplayers: data.maxplayers,
        average: data.average,
        averageweight: data.averageWeight,
        strategygamerank: data.strategy,
        familygamerank: data.family,
        partygamerank: data.party,
        abstractgamerank: data.abstract,
        thematicrank: data.thematic,
        wargamerank: data.war,
        customizablerank: data.customizable,
        childrengamerank: data.children,
      });
      // console.log("store", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

// 보드게임 즐겨찾기 등록
export const createFavorites = createAsyncThunk(
  "boardgames/createFavorites",
  async (reqData) => {
    try {
      const response = await httpClient.post(
        `boardgames/favorite/${reqData.userId}`,
        {
          reqData,
        }
      );
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

// 보드게임 즐겨찾기 조회
export const getFavorites = createAsyncThunk(
  "boardgames/getFavorites",
  async (reqData) => {
    try {
      const response = await httpClient.get(
        `boardgames/favorite/${reqData.userId}`
      );
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

// 보드게임 즐겨찾기 해제
export const deleteFavorites = createAsyncThunk(
  "boardgames/deleteFavorites",
  async (reqData) => {
    try {
      const response = await httpClient.delete(
        `boardgames/favorite/${reqData.userId}`,
        {
          reqData,
        }
      );
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
//보드게임 리뷰 등록
export const createReviews = createAsyncThunk(
  "boardgames/createReviews",
  async (reqData) => {
    try {
      const response = await httpClient.post("boardgames/review", {
        reqData,
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
//보드게임 리뷰 조회
export const getReviews = createAsyncThunk(
  "boardgames/getReviews",
  async (reqData) => {
    try {
      const response = await httpClient.get(
        `boardgames/review/${reqData.gameId}`
      );
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
//보드게임 유저별 리뷰 조회
export const getUserReviews = createAsyncThunk(
  "boardgames/getUserReviews",
  async (reqData) => {
    try {
      const response = await httpClient.get(
        `boardgames/review/user/${reqData.userId}`
      );
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
// 보드게임 추천

// 보드게임 리뷰 수정
export const updateReviews = createAsyncThunk(
  "boardgames/updateReviews",
  async (reqData) => {
    try {
      const response = await httpClient.put("boardgames/review", {
        reqData,
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
//보드게임 리뷰 삭제
export const deleteReviews = createAsyncThunk(
  "boardgames/deleteReviews",
  async (reqData) => {
    try {
      const response = await httpClient.delete("boardgames/review", {
        reqData,
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {};
const boardgamesSlice = createSlice({
  name: "boardgames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default boardgamesSlice.reducer;
export const {
  //   reservereducers
} = boardgamesSlice.actions;
export const selectBoardGames = (state) => state.boardgames;