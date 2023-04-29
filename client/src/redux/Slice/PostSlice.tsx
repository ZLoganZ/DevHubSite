import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArr: [],
  post: {},

  isOpenPostDetail: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      return {
        ...state,
        postArr: action.payload.postArr,
      };
    },
    openPostDetail: (state, action) => {
      return {
        ...state,
        isOpenPostDetail: true,
      };
    },
    setPost: (state, action) => {
      return {
        ...state,
        post: action.payload.post,
      };
    },
  },
});

export const { setAllPost, openPostDetail, setPost } = postSlice.actions;
export default postSlice.reducer;
