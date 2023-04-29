import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postArr: [],
  post: {},
  ownerInfo: {},

  isOpenPostDetail: false,
};

const postSlice = createSlice({
  name: 'post',
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
    setOwnerInfo: (state, action) => {
      return {
        ...state,
        ownerInfo: action.payload.ownerInfo,
      };
    },
  },
});

export const { setAllPost, openPostDetail, setPost, setOwnerInfo } = postSlice.actions;
export default postSlice.reducer;
