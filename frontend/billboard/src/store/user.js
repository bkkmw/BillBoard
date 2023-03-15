import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loginUser: {
    userId:"Default"
  }
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.loginUser.userId = action.payload
    }
  },
  extraReducers: (builder) => {

  }
})

export default userSlice.reducer;
export const {
  setUserId
} = userSlice.actions
export const selectUser = (state) => state.user
