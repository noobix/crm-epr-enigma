import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "authUser",
  initialState: { isAuthenticated: false, userDef: null },
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { login, logout } = authslice.actions;
export const authdata = (state) => state.authUser;
export default authslice.reducer;
