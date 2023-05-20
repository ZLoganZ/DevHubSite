import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_POSTSHARE_BY_ID_SAGA } from '../../redux/actionSaga/PostActionSaga';
import OpenPostShareDetail from '../ActionComponent/OpenPostDetail/OpenPostShareDetail';
import OpenMyPostShareDetail from '../ActionComponent/OpenPostDetail/OpenMyPostShareDetail';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';

const PostShareWrapper = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      GET_POSTSHARE_BY_ID_SAGA({
        id: postID,
      }),
    );
    dispatch(GET_USER_ID());
  }, []);

  if (!userInfo) {
  } else {
    return <OpenPostShareDetail key={post._id} post={post} userInfo={userInfo} />;
  }
};

export default PostShareWrapper;
