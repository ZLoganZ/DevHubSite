import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";
import MyProfile from "../../pages/MyProfile/MyProfile";
import Profile from "../../pages/Profile/Profile";

const ProfileWrapper = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();

  const { userID: userIDFromStore } = useSelector(
    (state: any) => state.authReducer
  );

  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  if (!userIDFromStore) {
    return <MyProfile />;
  } else if (userID === "me" || userID === userIDFromStore) {
    return <MyProfile />;
  } else {
    return <Profile userID={userID} />;
  }
};

export default ProfileWrapper;
