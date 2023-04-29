import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: true,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return { ...state, login: action.payload.login };
    },
    setUserID: (state, action) => {
      return { ...state, userID: action.payload.userID };
    },
  },
});

export const { setLogin, setUserID } = authSlice.actions;
export default authSlice.reducer;
