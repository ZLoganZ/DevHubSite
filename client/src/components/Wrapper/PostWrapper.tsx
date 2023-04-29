import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POST_BY_ID_SAGA } from "../../redux/actionSaga/PostActionSaga";
import OpenPostDetail from "../ActionComponent/OpenPostDetail/OpenPostDetail";
import OpenMyPostDetail from "../ActionComponent/OpenPostDetail/OpenMyPostDetail";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";

const PostWrapper = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      GET_POST_BY_ID_SAGA({
        id: postID,
      })
    );
    dispatch(GET_USER_ID());
  }, []);

  if (!userInfo) {
  } else if (userInfo.id === userID) {
    return <OpenMyPostDetail post={post} userInfo={userInfo} />;
  } else {
    return <OpenPostDetail post={post} userInfo={userInfo} />;
  }
};

export default PostWrapper;
