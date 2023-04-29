import React, { useEffect } from "react";
import { ConfigProvider, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import Headers from "../../components/Headers/Headers";
import Menu from "../../components/Menu/Menu";
import { Content } from "antd/es/layout/layout";
import { CHECK_LOGIN_SAGA } from "../../redux/actionSaga/AuthActionSaga";
import { Navigate, useNavigate } from "react-router-dom";
import { DOMAIN_NAME, TOKEN } from "../../util/constants/SettingSystem";
import axios from "axios";

const MainTemplate = (props: any) => {
  // Kiểm tra đã login hay chưa
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(CHECK_LOGIN_SAGA());
  // }, []);

  // const checkLogin = useSelector((state: any) => state.authReducer.login);

  // if (!checkLogin) {
  //   return <Navigate to="/login" />;
  // }

  const { Component } = props;

  return (
    <Layout>
      <Headers />
      <Layout hasSider>
        <Menu />
        <Content style={{ marginLeft: 80, marginTop: 76 }}>
          <Component />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTemplate;
