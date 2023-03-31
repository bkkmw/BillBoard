import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../utils/axios";

export const getuser = createAsyncThunk(
    "gameroom/getuser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await httpClient.post("/users/check-password",data);
            console.log(response)
            return response
        } catch (err) {
            return err.response.data;
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
