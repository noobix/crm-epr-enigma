import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "loginUser",
  initialState: { user: null, userDef: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserType(state, action) {
      state.userDef = action.payload;
    },
  },
});
export const { setUser, setUserType } = userSlice.actions;
export const userdata = (state) => state.loginUser;
export default userSlice.reducer;
