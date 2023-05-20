import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import MyProfile from '../../pages/MyProfile/MyProfile';
import Profile from '../../pages/Profile/Profile';

const ProfileWrapper = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userID: userIDFromStore } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  const path = location.pathname;

  if (path === '/me') navigate(`/user/${userIDFromStore}`);

  if (!userIDFromStore) {
    return <MyProfile />;
  } else if (userID === 'me' || userID === userIDFromStore) {
    if (userID === 'me') navigate(`/user/${userIDFromStore}`);
    else return <MyProfile key={userID} />;
  } else {
    return <Profile key={userID} userID={userID} />;
  }
};

export default ProfileWrapper;
