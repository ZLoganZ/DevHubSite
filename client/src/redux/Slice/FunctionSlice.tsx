import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigate: () => {},
  dispatch: () => {},
  useSelector: () => {},
};

const functionSlice = createSlice({
  name: "function",
  initialState,
  reducers: {
    setNavigate: (state, action) => {
      return { ...state, navigate: action.payload };
    },
    setDispatch: (state, action) => {
      return { ...state, dispatch: action.payload };
    },
    setUseSelector: (state, action) => {
      return { ...state, useSelector: action.payload };
    },

  },
});

export const { setNavigate, setDispatch, setUseSelector } = functionSlice.actions;
export default functionSlice.reducer;