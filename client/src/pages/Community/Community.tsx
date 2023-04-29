import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import StyleTotal from "./cssCommunity";
import { getTheme } from "../../util/functions/ThemeFunction";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Empty,
  Input,
  Row,
  Skeleton,
  Space,
  Switch,
  Tabs,
  Tag,
  theme,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Slice/ThemeSlice";
import { DARK_THEME, LIGHT_THEME } from "../../util/constants/SettingSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faFileLines,
  faComments,
  faLocationDot,
  faBriefcase,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { icon } from "@fortawesome/fontawesome-svg-core";
import TabPane from "antd/es/tabs/TabPane";
import MyPost from "../../components/Post/MyPost";
import NewPost from "../../components/NewPost/NewPost";
import { GET_ALL_POST_BY_USERID_SAGA } from "../../redux/actionSaga/PostActionSaga";
import MyPostShare from "../../components/Post/MyPostShare";
import { useParams } from "react-router-dom";
import { openDrawer } from "../../redux/Slice/DrawerHOCSlice";
import EditProfileForm from "../../components/Form/EditProfileForm/EditProfileForm";
import { LoadingProfileComponent } from "../../components/GlobalSetting/LoadingComponent/LoadingProfileComponent";

const descArray = [
  {
    icon: faSnowflake,
    title: "Java",
    color1: "#ed0e0e",
    color: "magenta",
  },
  {
    icon: faSnowflake,
    title: "Back End",
    color1: "#009B93",
    color: "cyan",
  },
  {
    icon: faSnowflake,
    title: "Data Analytics",
    color1: "#f5a623",
    color: "lime",
  },
  {
    icon: faSnowflake,
    title: "Front End",
    color1: "#7B00ED",
    color: "volcano",
  },
  {
    icon: faSnowflake,
    title: "Full Stack",
    color1: "#00B0F0",
    color: "geekblue",
  },
  {
    icon: faSnowflake,
    title: "DevOps",
    color1: "#7B00ED",
    color: "purple",
  },
  {
    icon: faSnowflake,
    title: "Project Management",
    color1: "#FE6700",
    color: "gold",
  },
  {
    icon: faSnowflake,
    title: "Design",
    color1: "#009B93",
    color: "blue",
  },
  {
    icon: faSnowflake,
    title: "Career",
    color1: "#00BCD4",
    color: "orange",
  },
  {
    icon: faSnowflake,
    title: "Problem Solver",
    color1: "#009B36",
    color: "geekblue",
  },
  {
    icon: faSnowflake,
    title: "App Design",
    color1: "#526D7B",
    color: "lime",
  },
];

const Community = () => {
  const dispatch = useDispatch();

  const { userID } = useParams<{ userID: string }>();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_ALL_POST_BY_USERID_SAGA({
        userId: "6426a822013f11e731f8083a",
      })
    );
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const postArraySlice = useSelector((state: any) => state.postReducer.postArr);
  const userInfoSlice = useSelector((state: any) => state.userReducer.userInfo);

  const postArray = useMemo(() => postArraySlice, [postArraySlice]);
  const userInfo = useMemo(() => userInfoSlice, [userInfoSlice]);

  const [isNotAlreadyChanged, setIsNotAlreadyChanged] = React.useState(true);

  const userInfoRef = React.useRef(userInfo);

  useEffect(() => {
    setIsNotAlreadyChanged(userInfoRef.current === userInfo);
  }, [userInfo, isNotAlreadyChanged, userInfoRef]);
  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {!postArray || !userInfo || isNotAlreadyChanged ? (
          <LoadingProfileComponent />
        ) : (
          <>
            <Row>
              <Col span={24} className="avatar_cover relative">
                <div
                  className="cover w-full h-80 rounded-br-lg rounded-bl-lg"
                  style={{
                    backgroundImage: `url("./images/CommunityPage/cover.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="avatar rounded-full overflow-hidden">
                  <img
                    src={
                      userInfo.userImage
                        ? userInfo.userImage
                        : "./images/DefaultAvatar/default_avatar.png"
                    }
                    alt="avt"
                  />
                </div>
              </Col>
              <Col offset={4} span={16}>
                <Row className="py-5 name_Editprofile">
                  <Col offset={6}>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: themeColorSet.colorText1 }}
                    >
                      React.JS
                    </div>
                    <div className="description mt-2">
                      <span style={{ color: themeColorSet.colorText2 }}>
                        Let's get together and discuss all things React! You can
                        talk about your latest project, React perf, React
                        testing, anything!
                      </span>
                    </div>
                    <Space className="subInformation mt-2" size={15}>
                      <div
                        className="unknow"
                        style={{ color: themeColorSet.colorText3 }}
                      >
                        <FontAwesomeIcon className="icon" icon={faFileLines} />
                        <span className="ml-2">Technology</span>
                      </div>
                      <div
                        className="createDate"
                        style={{ color: themeColorSet.colorText3 }}
                      >
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">Created Jun 2021</span>
                      </div>
                      <div
                        className="members"
                        style={{ color: themeColorSet.colorText3 }}
                      >
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">16,918 Members</span>
                      </div>
                    </Space>
                  </Col>
                </Row>
                <div className="flex">
                  <div className="mainContain mt-5 w-8/12">
                    <Tabs
                      defaultActiveKey="1"
                      // onChange={onChange}
                    >
                      <TabPane tab="All" key="1" className="mt-10">
                        <NewPost userInfo={userInfo} />
                        {postArray.length === 0 && (
                          <Empty
                            className="mt-10 mb-20"
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            description={<span>No post</span>}
                          />
                        )}
                        {postArray.map((item: any, index: number) => {
                          return (
                            <div>
                              {item.PostShared && (
                                <MyPostShare
                                  key={item._id}
                                  post={item}
                                  userInfo={userInfo}
                                  owner={item.user}
                                />
                              )}
                              {!item.PostShared && (
                                <MyPost
                                  key={item._id}
                                  post={item}
                                  userInfo={userInfo}
                                />
                              )}
                            </div>
                          );
                        })}
                      </TabPane>
                      <TabPane tab="Code" key="2" className="mt-10">
                        Code
                      </TabPane>
                      <TabPane tab="Link" key="3" className="mt-10">
                        Link
                      </TabPane>
                      <TabPane tab="Poll" key="4" className="mt-10">
                        Poll
                      </TabPane>
                      <TabPane tab="Media" key="5" className="mt-10">
                        Media
                      </TabPane>
                    </Tabs>
                  </div>
                  <div className="infoCommunity">
                    <div className="about">
                      <div className="title">About</div>
                      <div className="content"></div>
                      <div className="seeMore"></div>
                      <div
                        className="createDate"
                        style={{ color: themeColorSet.colorText3 }}
                      >
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">Created Jun 2021</span>
                      </div>
                      <div className="numberMember">11,396</div>
                      <div className="titleMembers">Members</div>
                    </div>
                    <div className="tags"></div>
                    <div className="admins"></div>
                    <div className="members"></div>
                    <div className="rules"></div>
                    <div className="recentlyJoined"></div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Community;
