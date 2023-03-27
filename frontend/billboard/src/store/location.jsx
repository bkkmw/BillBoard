import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../utils/axios";

export const getSido = createAsyncThunk(
    "location/sido",
    async (_, { rejectWithValue }) => {
        try {
            const response = await httpClient.get("/location/sido");
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)

export const getgugun = createAsyncThunk(
    "location/getgugun",
    async (sidoCode, { rejectWithValue }) => {
        try {
            const response = await httpClient.get(`/location/gugun/${sidoCode}`);
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)

export const getdong = createAsyncThunk(
    "location/getdong",
    async (gugunCode, { rejectWithValue }) => {
        try {
            const response = await httpClient.get(`/location/dong/${gugunCode}`);
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)

export const getdongCode = createAsyncThunk(
    "location/getdongCode",
    async (dongCode, { rejectWithValue }) => {
        try {
            const response = await httpClient.get(`/location/coordinate/${dongCode}`);
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)


const initialState = {
}
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default locationSlice.reducer;
export const {
    //   reservereducers
} = locationSlice.actions
export const selectlocation = (state) => state.location
