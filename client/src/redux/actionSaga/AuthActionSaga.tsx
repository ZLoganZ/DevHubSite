import { createAction } from "@reduxjs/toolkit";

export const CHECK_LOGIN_SAGA = createAction("CHECK_LOGIN_SAGA");

export const LOGIN_SAGA = createAction("LOGIN_SAGA", (data) => ({
  payload: data,
}));

export const LOGOUT_SAGA = createAction("LOGOUT_SAGA");

export const GET_USER_ID = createAction("GET_USER_ID");
