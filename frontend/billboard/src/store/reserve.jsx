import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import httpClient from "../utils/axios";

export const makeRoom = createAsyncThunk(
    "reserve/makeRoom",
    async (reserveData, { rejectWithValue }) => {
        try {
            const response = await httpClient.post("/room",{
            
                hostId:reserveData.hostId,
                title:reserveData.title,
                personLimit:reserveData.personLimit,
                location:reserveData.location,
                date:reserveData.date            
        });
        console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error);
        }
    }
)
export const deleteRoom = createAsyncThunk(
    "reserve/room/deletereply",
    async (roomId, {rejectWithValue}) => {
        try {
            const response = await httpClient.delete(`/room/${roomId}`)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)
export const correctRoom = createAsyncThunk(
    "reserve/room/correctRoom",
    async (data,{rejectWithValue}) => {
        try {
            // data써서 오류남
            const response = await httpClient.put(`/room/${data.roomId}`,{
                title:data.values.title,
                personLimit:data.values.personLimit,
                location:data.values.location,
                date:data.values.date
            })
            console.log(response)
            return response.data
        } catch (error) {
            
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const getRoom = createAsyncThunk(
    "reserve/getRoom",
    async (_,{rejectWithValue}) => {
        try {
            const response = await httpClient.get("/room")
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)
export const getRoomInfo = createAsyncThunk(
    "reserve/room",
    async (roomId,{rejectWithValue}) => {
        try {
            const response = await httpClient.get(`/room/${roomId}`)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)
export const makeReply = createAsyncThunk(
    "reserve/room/makereply",
    async (data, {rejectWithValue}) => {
        try {
            const response = await httpClient.post('/room/reply',{...data})
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)
export const deleteReply = createAsyncThunk(
    "reserve/room/deletereply",
    async (replyId, {rejectWithValue}) => {
        try {
            const response = await httpClient.delete(`/room/reply/${replyId}`)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)
export const getReply = createAsyncThunk(
    "reserve/room/getreply",
    async (roomId, {rejectWithValue}) => {
        try {
            const response = await httpClient.get(`/room/reply/${roomId}`)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const makeEntry = createAsyncThunk(
    "reserve/room/makeEntry",
    async (data, {rejectWithValue}) => {
        try {
            const response = await httpClient.post(`/room/entry`,{...data})
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export const deleteEntry = createAsyncThunk(
    "reserve/room/deleteEntry",
    async (data, {rejectWithValue}) => {
        try {
            const response = await httpClient.delete(`/room/entry`,{data:{...data}})
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)



const initialState = {
}
const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    // reservereducers:(state, action) => {
    // ...
    // }
  },
  extraReducers: (builder) => {

  }
})

export default reserveSlice.reducer;
export const {
//   reservereducers
} = reserveSlice.actions
export const selectRserve = (state) => state.user
