import React, { useEffect, useLayoutEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../../components/Headers/Headers';
import Menu from '../../components/Menu/Menu';
import { Content } from 'antd/es/layout/layout';
import { GET_USER_INFO_SAGA } from '../../redux/actionSaga/UserActionSaga';
import LoadingLogo from '../../components/GlobalSetting/LoadingLogo/LoadingLogo';

const MainTemplate = (props: any) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  useLayoutEffect(() => {
    dispatch(GET_USER_INFO_SAGA());
  }, []);

  if (!userInfo) {
    return <LoadingLogo />;
  }

  const { Component } = props;

  return (
    <Layout>
      <Headers />
      <Layout hasSider>
        <Menu />
        <Content style={{ marginLeft: "5rem", marginTop: "5rem" }}>
          <Component />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTemplate;
