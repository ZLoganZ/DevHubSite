import { all } from "redux-saga/effects";
import * as userSaga from "./UserSaga";
import * as authSaga from "./AuthSaga";
import * as postSaga from "./PostSaga";

export function* rootSaga() {
  yield all([
    // authSaga
    authSaga.theoDoicheckLoginSaga(),
    authSaga.theoDoiLoginSaga(),
    authSaga.theoDoiLogoutSaga(),
    authSaga.theoDoiGetUserIDSaga(),

    // userSaga
    userSaga.theoDoiRegisterUserSaga(),
    userSaga.theoDoiUpdateUserSaga(),

    // postSaga
    postSaga.theoDoiCreatePostSaga(),
    postSaga.theoDoiGetPostShareByIdSaga(),
    postSaga.theoDoiGetAllPostByUserIDSaga(),
    postSaga.theoDoiGetAllPostSaga(),
    postSaga.theoDoiDeletePostSaga(),
    postSaga.theoDoiLikePostSaga(),
    postSaga.theoDoiUpdatePostSaga(),
    postSaga.theoDoiSharePostSaga(),
    postSaga.theoDoiSavePostSaga(),
    postSaga.theoDoiSaveCommentSaga(),
    postSaga.theoDoiSaveReplySaga(),
    postSaga.theoDoiSaveCommentPostShareSaga(),
    postSaga.theoDoiLikePostShareSaga(),
    postSaga.theoDoiSaveReplyPostShareSaga(),
    postSaga.theoDoiGetPostByIdSaga(),
  ]);
}
