import { createAction } from "@reduxjs/toolkit";

export const REGIS_USER_SAGA = createAction("REGIS_USER_SAGA", (data) => ({
  payload: data,
}));

export const UPDATE_USER_SAGA = createAction("UPDATE_USER_SAGA", (data) => ({
  payload: data,
}));
