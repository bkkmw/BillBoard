import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../utils/axios";

export const getuser = createAsyncThunk(
    "gameroom/getuser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await httpClient.get("/locations/sido");
            return response.data
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)



const initialState = {
}
const gameroomSlice = createSlice({
    name: "gameroom",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default gameroomSlice.reducer;
export const {
    //   reservereducers
} = gameroomSlice.actions
export const selectgameroom = (state) => state.gameroom
