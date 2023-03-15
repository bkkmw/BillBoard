import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loginUser: {
    userId:""
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
