import React, { useEffect, useLayoutEffect } from 'react';
import { FloatButton, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../../components/Headers/Headers';
import Menu from '../../components/Menu/Menu';
import { Content } from 'antd/es/layout/layout';
import { GET_USER_INFO_SAGA } from '../../redux/actionSaga/UserActionSaga';
import LoadingLogo from '../../components/GlobalSetting/LoadingLogo/LoadingLogo';
import { getTheme } from '../../util/functions/ThemeFunction';

const MainTemplate = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useLayoutEffect(() => {
    dispatch(GET_USER_INFO_SAGA());
  }, []);

  if (!userInfo) {
    return <LoadingLogo />;
  }

  const { Component } = props;

  return (
    <Layout style={{ backgroundColor: themeColorSet.colorBg1 }}>
      <FloatButton.BackTop />
      <Headers />
      <Layout hasSider style={{ backgroundColor: themeColorSet.colorBg1 }}>
        <Menu />
        <Content style={{ marginLeft: '5rem', marginTop: '5rem' }}>
          <div
            style={{
              backgroundImage: 'url(/images/ProfilePage/cover.jpg)',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Component />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTemplate;
