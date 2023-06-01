import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GET_COMMUNITY_BY_ID_SAGA } from '../../redux/actionSaga/CommunityActionSaga';
import CommunityAdmin from './CommunityAdmin';
import CommunityMember from './CommunityMember';
import CommunityNoMember from './CommunityNoMember';
import { LoadingProfileComponent } from '../../components/GlobalSetting/LoadingProfileComponent/LoadingProfileComponent';
import { getTheme } from '../../util/functions/ThemeFunction';
import { ConfigProvider } from 'antd';
import StyleTotal from './cssCommunity';

const CommunityWrapper = () => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const { communityID } = useParams();

  useEffect(() => {
    dispatch(GET_COMMUNITY_BY_ID_SAGA(communityID));
  }, []);

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  const role = useMemo(() => {
    if (userInfo.role) {
      if (userInfo.role === 'ADMIN') return 'ADMIN';
      else if (userInfo.role === 'MEMBER') return 'MEMBER';
      else return 'NO_MEMBER';
    }
  }, [userInfo]);
  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {role === 'ADMIN' ? (
          <CommunityAdmin />
        ) : role === 'MEMBER' ? (
          <CommunityMember />
        ) : role === 'NO_MEMBER' ? (
          <CommunityNoMember />
        ) : (
          <LoadingProfileComponent />
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default CommunityWrapper;
