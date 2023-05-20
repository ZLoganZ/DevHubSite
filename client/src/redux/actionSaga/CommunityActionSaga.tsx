import { createAction } from '@reduxjs/toolkit';

export const GET_COMMUNITY_BYID_SAGA = createAction('GET_COMMUNITY_BYID_SAGA', (data) => ({
  payload: data,
}));
