import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Col,
  ConfigProvider,
  Row,
  Space,
  Switch,
  theme,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssHeaders";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import Title from "antd/es/typography/Title";
import Search from "antd/es/transfer/search";
import {
  BellOutlined,
  CommentOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DARK_THEME, LIGHT_THEME } from "../../util/constants/SettingSystem";
import { setTheme } from "../../redux/Slice/ThemeSlice";
import { NavLink } from "react-router-dom";

const Headers = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();
  const { algorithm } = getTheme();

  // Switch theme
  const dispatch = useDispatch();
  const onChange = (checked: boolean) => {
    if (checked) {
      dispatch(setTheme({ theme: DARK_THEME }));
    } else {
      dispatch(setTheme({ theme: LIGHT_THEME }));
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: algorithm,
        token: {
          ...themeColor,
          controlHeight: 38,
        },
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Header
          className="header"
          style={{
            backgroundColor: themeColorSet.colorBg2,
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
          }}
        >
          <Row align="middle">
            <Col span={16} offset={4}>
              <Row align="middle">
                <Col span={4}>
                  <FontAwesomeIcon
                    className="iconLogo text-3xl"
                    icon={faSnowflake}
                    style={{ color: themeColorSet.colorText1 }}
                  />
                  <Title
                    level={2}
                    className="title inline-block ml-2"
                    style={{ color: themeColorSet.colorText1 }}
                  >
                    DevHub
                  </Title>
                </Col>
                <Col span={15} className="px-4">
                  <Search placeholder="Search" />
                </Col>
                <Col span={5} className="pl-3">
                  <Space size={25}>
                    <Badge count={5}>
                      <Avatar
                        className="messageButton cursor-pointer"
                        shape="circle"
                        icon={<CommentOutlined className="text-xl" />}
                      />
                    </Badge>
                    <Badge count={7}>
                      <Avatar
                        className="notiButton cursor-pointer"
                        icon={<BellOutlined className="text-xl" />}
                      />
                    </Badge>
                    <NavLink to="/me">
                      <Avatar
                        className="avatarButton cursor-pointer"
                        icon={<UserOutlined />}
                        size="default"
                      />
                    </NavLink>
                    <Switch
                      checkedChildren="dark"
                      unCheckedChildren="light"
                      defaultChecked
                      onChange={onChange}
                    />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Headers;
