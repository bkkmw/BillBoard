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
export const postHistory = createAsyncThunk(
    "gameroom/postHistory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await httpClient.post("history", data)
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            return err
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
export const getCombiRecom = createAsyncThunk(
    "gameroom/getCombiRecom",
    async (data, { rejectWithValue }) => {
        try {
            const response = await httpClient.post(`/boardgames/recommend`, data)
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            return err;
        }
    }

)
export const postGameHistory = createAsyncThunk(
    "gameroom/postGameHistory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await httpClient.post('/histories', data)
            console.log(response)
            return response
        } catch (err) {
            console.log(err)
            return err
        }
    }
)



const initialState = {
    players: [],
    gameInfo: { gameId: '' },
    isInGame: false,
    playTime: 0,
    gameHistory: []

}
const gameroomSlice = createSlice({
    name: "gameroom",
    initialState,
    reducers: {
        setPlayer: (state, action) => {
            state.players = action.payload
        },
        setGame: (state, action) => {
            state.gameInfo = action.payload
        },
        setIsInGame: (state, action) => {
            state.isInGame = action.payload
        },
        setPlayTime: (state, action) => {
            state.playTime = action.payload
        },
        setGameroomInit: (state, action) => {
            console.log('초기화')
            // state = {
            //     players: [],
            //     gameInfo: { gameId: '' },
            //     isInGame: false,
            //     playTime: 0
            // }
            state.players = []
            state.gameInfo = { gameId: '' }
            state.isInGame = false
            state.playTime = 0
            state.gameHistory = []
        },
        setGameEnd: (state, action) => {
            state.gameHistory = [state.gameInfo, ...state.gameHistory,]
            state.gameInfo = { gameId: '' }
            state.playTime = 0
        }

    },
    extraReducers: (builder) => {

    }
})

export default gameroomSlice.reducer;
export const {
    setPlayer,
    setGame,
    setIsInGame,
    setPlayTime,
    setGameroomInit,
    setGameEnd
} = gameroomSlice.actions
export const selectgameroom = (state) => state.gameroom
