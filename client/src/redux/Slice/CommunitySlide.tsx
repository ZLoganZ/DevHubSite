import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  community: {},
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunity: (state, action) => {
      return {
        ...state,
        community: action.payload,
      };
    },
  },
});

export const { setCommunity } = communitySlice.actions;
export default communitySlice.reducer;
