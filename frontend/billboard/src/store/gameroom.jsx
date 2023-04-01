import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../utils/axios";

export const getuser = createAsyncThunk(
    "gameroom/getuser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await httpClient.post("/users/check-password", data);
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            return err;
        }
    }
)
export const getentries = createAsyncThunk(
    "gameroom/getentries",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await httpClient.get(`/rooms/entries/${userId}`)
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            return err;
        }
    }

)



const initialState = {
    players: []

}
const gameroomSlice = createSlice({
    name: "gameroom",
    initialState,
    reducers: {
        setPlayer: (state, action) => {
            state.players = action.payload
        }

    },
    extraReducers: (builder) => {

    }
})

export default gameroomSlice.reducer;
export const {
    setPlayer
} = gameroomSlice.actions
export const selectgameroom = (state) => state.gameroom
