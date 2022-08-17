import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "authUser",
  initialState: { isAuthenticated: false, userId: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload;
    },
    userid(state, action) {
      state.userId = action.payload;
    },
  },
});
export const { login, userid } = authslice.actions;
export const authdata = (state) => state.auth;
export default authslice.reducer;
