import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import StyleTotal from "./cssMyProfile";
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
import "react-quill/dist/quill.snow.css";
import descArray from "../../util/constants/Description";

const MyProfile = () => {
  const dispatch = useDispatch();

  const { userID } = useParams<{ userID: string }>();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_ALL_POST_BY_USERID_SAGA({
        userId: userID,
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
                    backgroundImage: `url("./images/TimeLinePage/cover2.jpg")`,
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
                  <Col offset={6} span={12}>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: themeColorSet.colorText1 }}
                    >
                      {userInfo.username}
                    </div>
                    <div className="position mt-2">
                      <FontAwesomeIcon className="icon" icon={faSnowflake} />
                      <span
                        style={{ color: themeColorSet.colorText3 }}
                        className="ml-2"
                      >
                        User Interface Architect & Senior Manager UX
                      </span>
                    </div>
                    <div className="viewResume mt-2">
                      <FontAwesomeIcon className="icon" icon={faFileLines} />
                      <NavLink to="/resume" className="ml-2">
                        View Resume
                      </NavLink>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="chat_Follow flex justify-around items-center w-full h-full">
                      <div className="editProfile">
                        <button
                          className="btnEditProfile px-4 py-2"
                          onClick={() => {
                            dispatch(
                              openDrawer({
                                title: "Edit Profile",
                                component: <EditProfileForm />,
                              })
                            );
                          }}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="id_address_join">
                  <span className="id item mr-2">@tianrongliew</span>
                  <span className="address item mr-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faLocationDot}
                    />
                    Global
                  </span>
                  <span className="join">
                    <FontAwesomeIcon className="icon mr-2" icon={faBriefcase} />
                    Joined Jun 2020
                  </span>
                </div>
                <Col span={18} className="mt-5">
                  <div className="description flex flex-wrap">
                    {descArray.map((item, index) => {
                      if (userInfo?.descriptions?.indexOf(item.title) !== -1) {
                        return (
                          <Tag
                            className="item mx-2 my-2 px-4 py-1"
                            key={index}
                            color={themeColorSet.colorBg2}
                            style={{
                              border: "none",
                            }}
                          >
                            {item.svg} &nbsp;
                            {item.title}
                          </Tag>
                        );
                      }
                      return null;
                    })}
                  </div>
                </Col>
                <div className="follow mt-5">
                  <span className="follower item mr-2">
                    <span className="mr-1">{2710}</span> Follower
                  </span>
                  <span className="following item mr-2">
                    <span className="mr-1">{78}</span> Following
                  </span>
                  <span className="post mr-2">
                    <span className="mr-1">{56}</span> Post
                  </span>
                </div>
                <div className="experience mt-5">
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Rabiloo</span>
                    <span className="position mr-2">Java Developer |</span>
                    <span className="date">2019.10 ~ 2022.10</span>
                  </div>
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Pan United</span>
                    <span className="position mr-2">Software Engineer |</span>
                    <span className="date">~ 2022.10</span>
                  </div>
                </div>
                <div className="contact mt-5">
                  <Space>
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faFacebookF)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faGithub)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faTwitter)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faInstagram)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faLinkedin)} />}
                    />
                  </Space>
                </div>
                <div className="mainContain mt-5">
                  <Tabs
                    defaultActiveKey="2"
                    // onChange={onChange}
                  >
                    <TabPane tab="Introduce" key="1" className="mt-10">
                      Introduce
                    </TabPane>
                    <TabPane tab="Post" key="2" className="mt-10">
                      <div className="w-8/12">
                        <NewPost userInfo={userInfo} />
                      </div>
                      {postArray.length === 0 && (
                        <div className="w-8/12">
                          <Empty
                            className="mt-10 mb-20"
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            description={<span>No post</span>}
                          />
                        </div>
                      )}
                      {postArray.map((item: any, index: number) => {
                        return (
                          <div className="w-8/12">
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
                    <TabPane tab="Show" key="3" className="mt-10">
                      Show
                    </TabPane>
                    <TabPane tab="Seri" key="4" className="mt-10">
                      Seri
                    </TabPane>
                    <TabPane tab="Guest book" key="5" className="mt-10">
                      Guest book
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MyProfile;
