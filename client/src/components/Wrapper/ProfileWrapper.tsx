import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import MyProfile from '../../pages/MyProfile/MyProfile';
import Profile from '../../pages/Profile/Profile';
import { LoadingProfileComponent } from '../GlobalSetting/LoadingProfileComponent/LoadingProfileComponent';
import { getTheme } from '../../util/functions/ThemeFunction';
import { ConfigProvider } from 'antd';

const ProfileWrapper = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

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

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <div style={{backgroundColor: themeColorSet.colorBg1}}>
        {!userIDFromStore ? (
          <LoadingProfileComponent />
        ) : userID === 'me' || userID === userIDFromStore ? (
          <MyProfile key={userID} />
        ) : (
          <Profile key={userID} userID={userID} />
        )}
      </div>
    </ConfigProvider>
  );
};

export default ProfileWrapper;
