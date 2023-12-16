import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: null,
  userID: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return { ...state, login: action.payload.login };
    },
    setUserID: (state, action) => {
      return { ...state, userID: action.payload.userID };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload.error };
    },
  },
});

export const { setLogin, setUserID, setError } = authSlice.actions;
export default authSlice.reducer;
